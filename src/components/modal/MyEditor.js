// import { Editor, EditorState, RichUtils } from 'draft-js';
// import React from 'react';



// class MyEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { editorState: EditorState.createEmpty() };
//     this.onChange = editorState => this.setState({ editorState });
//     this.handleKeyCommand = this.handleKeyCommand.bind(this);
//     this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
//     this.toggleBlockType = this.toggleBlockType.bind(this);
//   }

//   toggleInlineStyle(event) {
//     event.preventDefault();
//     let style = event.currentTarget.getAttribute('data-style');
//     this.setState({
//       editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
//     });
//   }

//   toggleBlockType (event) {
//     event.preventDefault();

//     let block = event.currentTarget.getAttribute('data-block');
//     this.setState({
//       editorState: RichUtils.toggleBlockType(this.state.editorState, block)
//     });
//   }

//   handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   }

//   renderBlockButton(value, block) {
//     return (
//       <input
//         type="button"
//         key={block}
//         value={value}
//         data-block={block}
//         onMouseDown={this.toggleBlockType}
//       />
//     );
//   }

//   renderInlineStyleButton(value, style) {
//     return (
//       <input
//         type="button"
//         key={style}
//         value={value}
//         data-style={style}
//         onMouseDown={this.toggleInlineStyle}
//       />
//     );
//   }

//   changeTheState(){
//     console.log("buraya girdik");
//     this.setState({something:"some value"})
//  }


//   render() {
//     const blockTypeButtons = [
//       {
//         value: 'Heading One',
//         block: 'header-one'
//       },

//       {
//         value: 'Heading Two',
//         block: 'header-two'
//       },

//       {
//         value: 'Heading Three',
//         block: 'header-three'
//       },

//       {
//         value: 'Blockquote',
//         block: 'blockquote'
//       },

//       {
//         value: 'Unordered List',
//         block: 'unordered-list-item'
//       },

//       {
//         value: 'Ordered List',
//         block: 'ordered-list-item'
//       }
//     ];

//     const inlineStyleButtons = [
//       {
//         value: 'Bold',
//         style: 'BOLD'
//       },

//       {
//         value: 'Italic',
//         style: 'ITALIC'
//       },

//       {
//         value: 'Underline',
//         style: 'UNDERLINE'
//       },

//       {
//         value: 'Strikethrough',
//         style: 'STRIKETHROUGH'
//       },

//       {
//         value: 'Code',
//         style: 'CODE'
//       }
//     ];

//     return (

//       <div id="content">
//        <div className="inline-style-options">
//           Inline Styles:
//           {inlineStyleButtons.map((button) => {
//             return this.renderInlineStyleButton(button.value, button.style);
//           })}
//         </div>
//         <div className="block-style-options">
//           Block Types:
//           {blockTypeButtons.map((button) => {
//             return this.renderBlockButton(button.value, button.block);
//           })}
//         </div>

//         <div className="editor">
//           <Editor

//             placeholder="Blog yazınızı giriniz"
//             editorState={this.state.editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             onChange={this.onChange}
//           />
//         </div>
//       </div>

//     );
//   }
// }

// export default MyEditor




import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.myEditor = React.createRef();

  }
  onChange = editorState => {
    this.props.onChange('editorState', editorState);
  };

  focus = () => this.myEditor.current.focus();

  handleKeyCommand = command => {
    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
  };
  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  };
  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  };
  render() {
    const { editorState } = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} >
          <Editor
            onEditorStateChange={editorState => {
              setEditorState(editorState);
              handleChange(editorState);
            }}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref={this.myEditor}
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
