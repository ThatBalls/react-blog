import { Brew } from "../../components/Brew";

export default function BrewTest() {
    return (
        <Brew events={{
            start: 'describer-start',
            message: 'describer-message',
            chunk: 'describer-chunk',
            complete: 'describer-complete'
        }} />
    );
}