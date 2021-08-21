import { Editor, EditorState, RichUtils } from 'draft-js';
import React from 'react';



class MyEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    
    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ));
    }
    _onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'ITALIC'
        ));
    }
    _onCodeClick(){
        console.log("BURAYA GİRDİK")
        this.onChange(RichUtils.toggleCode(
            this.state.editorState
        ));
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    render() {
        return (

            <div id="content">
            <h1>Draft.js Editor</h1>
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            <button onClick={this._onItalicClick.bind(this)}>Italic</button>
            <div className="editor">
              <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              />
            </div>
          </div>
         
        );
    }
}

export default MyEditor