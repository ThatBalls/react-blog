/* const prompt = `Create a magic item for dungeons and dragons 5th edition that meets the following criteria: 
                    ${this.itemName ? `Item Name: ${this.itemName}` : ""}
                    ${this.itemType ? `Item Type: ${this.itemType}` : "Item Type: any (be specific)"}
                    ${this.itemRarity ?  `Rarity: ${this.itemRarity}` : ""}
                    ${this.additionalDetails? `Additional Details: ${this.additionalDetails}` : ""}
                    ${this.foundLocation ? `Found Location: ${this.foundLocation}` : ""}
                    The item should have abilities fitting for its rarity. Item description should include visual and other sensory description of the item. ${featureDescriptions[this.itemRarity]} Features should be as specific as possible. Saving throws should have DCs, attacks should have damage, etc. Format response in JSON with structure: { "itemName": string, "itemType": string, "itemDescription": string, "itemFeatures": { "featureTitle": string, "featureDescription": string }[] }`;
const featureDescriptions = {
          "Common": `The item should have one minor feature that either offers some convenience or novel ability but does not increase the user's combat effectiveness.`,
          "Uncommon": `The item should have one or two minor features that can effect the user's effectiveness in or out of combat. If it has a bonus to attacks or spell save DCs, it should be +1.`,
          "Rare": `The item should have two features that should noticeable increase the user's effectiveness in or out of combat. If it has a bonus to attacks or spell save DCs, it should be +2.`,
          "Very Rare": `The item should have two or three features that should significantly increase the user's effectiveness in or out of combat. If it has a bonus to attacks or spell save DCs, it should be +3.`,
          "Legendary": `The item should have three features that significantly increase the user's effectiveness in and out of combat. The item should noticeably alter the way the user approaches problems. If it has a bonus to attacks or spell save DCs, it should be +3.`,
          "Artifact": `The item should have four features that dramatically increases the user's effectiveness. It should signifiantly alter the way the game is played in some novel way. If it has a bonus to attacks or spell save DCs, it should be +3.`
        }; */