import { AIChat } from "components/AIChat";

export default function ChatTest() {
    return (
        <AIChat events={{start: 'assistant-start',
            message: 'assistant-message',
            chunk: 'assistant-chunk',
            complete: 'assistant-complete'}}
            />
    );
}