import { useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import parse from 'html-react-parser';
import { useDebounce } from "hooks/debounce";
import { AddItemButton, BrewSelect, BrewSelectContainer, CardContainer, CardContents, CardTitle, DialogCloseButton, DraggableCard, DraggableContainer, FrameButton, FrameError, FrameInput, FrameSelectContainer, ResizeHandle, ResizeOverlay, ResizePreview, ScreenContainer, ScreenDialog, SearchContainer, SearchInput, SearchResult, SearchResults, TypeSelectButton, TypeSelectContainer } from "./PlayerScreen.css";

interface IScreenItem {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  zIndex: number;
  isMinimized: boolean;
}

interface IFrameItem extends IScreenItem {
  src: string;
}

interface ISearchItem extends IScreenItem {
  children: React.ReactNode;
}

interface INoteItem extends IScreenItem {
  text: string;
}

function instanceOfSearchItem(object: any): object is ISearchItem {
  return "children" in object;
}

function instanceOfFrameItem(object: any): object is IFrameItem {
  return "src" in object;
}

function instanceOfNoteItem(object: any): object is INoteItem {
  return "text" in object;
}

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

enum ScreenItemType {
  SearchItem,
  FrameItem,
  BrewItem,
  NoteItem
}

const ScreenItemLabels: Record<ScreenItemType, string> = {
  [ScreenItemType.SearchItem]: "Search",
  [ScreenItemType.FrameItem]: "Frame",
  [ScreenItemType.BrewItem]: "Brew",
  [ScreenItemType.NoteItem]: "Note",
};

enum ModalType {
  None,
  Add,
  Search,
  Frame,
  Brew
}

const BaseDialog = ({ isOpen, children, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);
  return (
    <ScreenDialog ref={dialogRef}>
      <DialogCloseButton onClick={onClose}>X</DialogCloseButton>
      {children}
    </ScreenDialog>
  );
};

const ScreenItemSelector = ({ isOpen, onTypeSelect, onClose }) => {
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <TypeSelectContainer>
        {Object.values(ScreenItemLabels).map((type) => (
          <TypeSelectButton key={type} onClick={() => onTypeSelect(type)}>{type}</TypeSelectButton>
        ))}
      </TypeSelectContainer>
    </BaseDialog>
  );
}

const SearchDialog = ({ isOpen, onSelect, onClose }) => {
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ searchResults, setSearchResults ] = useState<ISearchItem[] | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch !== "") {
      fetch(`https://roll20.net/compendium/compendium/globalsearch/dnd5e?terms=${debouncedSearch}`).then(
        (res) => res.json().then((data) => {
          setSearchResults(data);
        }
      ));
    }
  }, [debouncedSearch]);

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const onResultClick = (result) => {
    onSelect(result);
    setSearchTerm("");
    setSearchResults(null);
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <TypeSelectContainer>
        <SearchContainer>
          <SearchInput onChange={onSearchChange} placeholder="Search..." />
          {searchResults ? (<SearchResults>
            {searchResults.map((result) => {
              return (
                <SearchResult key={result.id} onClick={() => onResultClick(result)}>{`${result.value} (${result.category})`}</SearchResult>
              )
            })}
          </SearchResults>) : null}
        </SearchContainer>
      </TypeSelectContainer>
    </BaseDialog>
  );
};

const FrameDialog = ({ isOpen, onSelect, onClose }) => {
  const [ frameUrl, setFrameUrl ] = useState<string>("");
  const [ frameTitle, setFrameTitle ] = useState<string>("");
  const [ isValid, setIsValid ] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(isValidHttpUrl(frameUrl));
  }, [frameUrl]);

  const onButtonClick = (frameData) => {
    if (isValid) {
      onSelect(frameData);
      setFrameUrl("");
      setFrameTitle("");
    }
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <FrameSelectContainer>
        <FrameInput placeholder="Title" onChange={(event) => setFrameTitle(event.target.value)} />
        <FrameInput placeholder="URL" onChange={(event) => setFrameUrl(event.target.value)} />
        <FrameButton onClick={() => onButtonClick({ title: frameTitle, url: frameUrl })}>Add</FrameButton>
        {isValid ? null : <FrameError>Invalid URL</FrameError>}
      </FrameSelectContainer>
    </BaseDialog>
  );
};

const BrewDialog = ({ isOpen, brews, onSelect, onClose }) => {
  const [ brew, setBrew ] = useState<Object>(null);

  const onButtonClick = () => {
    onSelect(brew);
    setBrew(null);
  };

  const onBrewChange = (event) => {
    setBrew(brews.find((brew) => brew.slug === event.target.value));
  }

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <BrewSelectContainer>
        <BrewSelect value={brew?.slug || ""} onChange={onBrewChange}>
          <option value="" disabled>Select a brew</option>
          {brews.map((brew) => (
            <option key={brew.slug} value={brew.slug}>{brew.title}</option>
          ))}
        </BrewSelect>
        <AddItemButton onClick={() => onButtonClick()}>Add</AddItemButton>
      </BrewSelectContainer>
    </BaseDialog>
  );
};

const MIN_RESIZE_WIDTH = 200;
const MIN_RESIZE_HEIGHT = 200;

export const DraggableScreenItem = ({ item, onMouseDown, onClick, onClose }) => {
  const cardRef = useRef(null);
  const [size, setSize] = useState(item.size);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [resizeWidth, setResizeWidth] = useState(0);
  const [resizeHeight, setResizeHeight] = useState(0);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing && resizeWidth !== 0 && resizeHeight !== 0) {
      console.log(resizeWidth, resizeHeight);
      setSize({ width: Math.max(resizeWidth, MIN_RESIZE_WIDTH), height: Math.max(resizeHeight, MIN_RESIZE_HEIGHT) });
      setResizeWidth(0);
      setResizeHeight(0);
    }
  }, [isResizing, resizeWidth, resizeHeight]);

  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.clientX, event.clientY)
    setIsResizing(true);
    setResizeStart({ x: event.clientX, y: event.clientY });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [resizeWidth, resizeHeight]);

  const handleMouseMove = useCallback((event) => {
    if (cardRef.current === null) return;
    const { x, y } = cardRef.current.getBoundingClientRect();
    const widthDiff = Math.abs(resizeStart.x - event.clientX) * (resizeStart.x > event.clientX ? -1 : 1);
    const heightDiff = Math.abs(resizeStart.y - event.clientY) * (resizeStart.y > event.clientY ? -1 : 1);
    setResizeWidth(widthDiff - x); // Update width based on mouse position
    setResizeHeight(heightDiff - y); // Update height based on mouse position
  }, [resizeStart]);

  const handleMouseUp = useCallback((event) => {
    event.stopPropagation();
    setResizeStart({ x: 0, y: 0 });
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  return (
    <Draggable
      key={item.id}
      bounds="parent"
      defaultPosition={item.position}
      onMouseDown={() => onMouseDown(item.id)}>
      <DraggableCard ref={cardRef} isMinimized={item.isMinimized} zIndex={item.zIndex} onClick={onClick}>
        <CardContainer size={size}>
          <DialogCloseButton onClick={() => onClose(item.id)}>X</DialogCloseButton>
          <CardTitle>{item.name}</CardTitle>
          <CardContents>
            {instanceOfSearchItem(item) ? item.children : null}
            {instanceOfFrameItem(item) ? <iframe src={item.src} width={size.width} height={size.height - 70}></iframe> : null}
            {instanceOfNoteItem(item) ? <textarea onMouseDown={(event) => event.stopPropagation()} placeholder="Enter note here...">{item.text}</textarea> : null}
          </CardContents>
        </CardContainer>
        <ResizeHandle onMouseDown={handleMouseDown} />
        <ResizeOverlay isResizing={isResizing} />
        {/* <ResizePreview size={{ width: resizeWidth, height: resizeHeight }} /> */}
      </DraggableCard>
    </Draggable>
  )
};

export const PlayerScreen = ({ brews }) => {
  const [ screenItems, setScreenItems ] = useState<Record<string, ISearchItem | IFrameItem | INoteItem>>({});
  
  const [ openModal, setOpenModal ] = useState<ModalType>(ModalType.None);
  const maxZIndex = useRef<number>(Object.values(screenItems).length + 1);
  const [noteCount, setNoteCount] = useState<number>(1);

  const timer = useRef<any>();

  const onClick = () => {
    console.log("click")
  };

  const onDoubleClick = (id: string) => {
    const newScreenItems = { ...screenItems };
    newScreenItems[id].isMinimized = !screenItems[id].isMinimized;
    setScreenItems(newScreenItems);
  };

  const onClickHandler = (event, id) => {
    clearTimeout(timer.current);

    if (event.detail === 1) {
      timer.current = setTimeout(onClick, 200)
    } else if (event.detail % 2 === 0) {
      onDoubleClick(id)
    }
  };

  const onMouseDown = (id) => {
    const newSearchItems = { ...screenItems };
    newSearchItems[id].zIndex = maxZIndex.current;
    maxZIndex.current += 1;
    setScreenItems(newSearchItems);
  }

  const onResultClick = useCallback(async (result) => {
    const json = await ((await fetch(`https://app.roll20.net/compendium/dnd5e/${result.category}:${result.pagename}.json`)).json());
    const newScreenItems = { ...screenItems };
    newScreenItems[`${json.id}`] = {
      id: json.id,
      name: `${json.name} (${json.data.Category})`,
      children: parse(json.htmlcontent),
      position: {
        x: 100,
        y: 100,
      },
      size: {
        width: 400,
        height: 400,
      },
      zIndex: 2,
      isMinimized: false,
    }
    setScreenItems(newScreenItems);
    setOpenModal(ModalType.None);
  }, [screenItems]);

  const onFrameOpen = useCallback((frameData) => {
    const newScreenItems = { ...screenItems };
    newScreenItems[`${frameData.title}`] = {
      id: frameData.title,
      name: frameData.title,
      src: frameData.url,
      position: {
        x: 100,
        y: 100,
      },
      size: {
        width: 500,
        height: 500,
      },
      zIndex: 2,
      isMinimized: false,
    }
    setScreenItems(newScreenItems);
    setOpenModal(ModalType.None);
  }, [screenItems]);

  const onBrewOpen = useCallback((brewData) => {
    const newScreenItems = { ...screenItems };
    newScreenItems[`${brewData.title}`] = {
      id: brewData.title,
      name: brewData.title,
      src: brewData.externalUrl,
      position: {
        x: 100,
        y: 100,
      },
      size: {
        width: 500,
        height: 500,
      },
      zIndex: 2,
      isMinimized: false,
    }
    setScreenItems(newScreenItems);
    setOpenModal(ModalType.None);
  }, [screenItems]);

  const onNoteOpen = useCallback((noteData) => {
    const newScreenItems = { ...screenItems };
    newScreenItems[`note-${noteCount}`] = {
      id: `note-${noteCount}`,
      name: `Note ${noteCount}`,
      text: noteData.content,
      position: {
        x: 100,
        y: 100,
      },
      size: {
        width: 500,
        height: 500,
      },
      zIndex: 2,
      isMinimized: false,
    }
    setScreenItems(newScreenItems);
    setOpenModal(ModalType.None);
    setNoteCount(noteCount + 1);
  }, [screenItems]);

  const onTypeSelect = (type) => {
    switch (type) {
      case ScreenItemLabels[ScreenItemType.SearchItem]:
        setOpenModal(ModalType.Search);
        break;
      case ScreenItemLabels[ScreenItemType.FrameItem]:
        setOpenModal(ModalType.Frame);
        break;
      case ScreenItemLabels[ScreenItemType.BrewItem]:
        setOpenModal(ModalType.Brew);
        break;
      case ScreenItemLabels[ScreenItemType.NoteItem]:
        setOpenModal(ModalType.None);
        onNoteOpen({
          title: "Note",
          content: "",
        });
        break;
    }
  };

  const onDialogClose = () => {
    setOpenModal(ModalType.None);
  };

  const onScreenItemClose = (id) => {
    const newScreenItems = { ...screenItems };
    delete newScreenItems[id];
    setScreenItems(newScreenItems);
  };

  return (
    <ScreenContainer>
      <ScreenItemSelector isOpen={openModal === ModalType.Add} onTypeSelect={onTypeSelect} onClose={onDialogClose} />
      <SearchDialog isOpen={openModal === ModalType.Search} onSelect={onResultClick} onClose={onDialogClose} />
      <FrameDialog isOpen={openModal === ModalType.Frame} onSelect={onFrameOpen} onClose={onDialogClose} />
      <BrewDialog isOpen={openModal === ModalType.Brew} brews={brews} onSelect={onBrewOpen} onClose={onDialogClose} />
      <AddItemButton onClick={() => setOpenModal(ModalType.Add)}>+</AddItemButton>
      {/* <SearchContainer>
        <SearchInput value={searchTerm} placeholder="Search..." onChange={onSearchChange}/>
        {searchResults ? (<SearchResults>
          {searchResults.map((result) => {
            return (
              <SearchResult key={result.id} onClick={() => onResultClick(result)}>{`${result.value} (${result.category})`}</SearchResult>
            )
          })}
        </SearchResults>) : null}
      </SearchContainer> */}
      <DraggableContainer>
        {screenItems ? Object.values(screenItems).map((item) => {
          return (
            <DraggableScreenItem key={item.id} item={item} onMouseDown={onMouseDown} onClose={() => onScreenItemClose(item.id)} onClick={(event) => onClickHandler(event, item.id)} />
          );
        }) : null}
      </DraggableContainer>
    </ScreenContainer>
  );
};
