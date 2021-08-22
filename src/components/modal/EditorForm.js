
import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import { EditorState } from 'draft-js';
import MyEditor from './MyEditor';
// Helper styles for demo
// import {
//     MoreResources,
//     DisplayFormikState,
//   } from '../helpers/formik-helper';
  

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    editorState: EditorState.createEmpty(),
  }),
  handleSubmit: (values, { setSubmitting }) => {
      // you probably want to transform draftjs state to something else, but I'll leave that to you.
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
   
  },
  displayName: 'MyForm',
});

const MyForm = ({
  values,
  dirty,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
  isSubmitting,
}) => (
    <MyEditor
      editorState={values.editorState}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />

);

const MyEnhancedForm = formikEnhancer(MyForm);


const EditorForm = () => (
  <div className="app">
    <MyEnhancedForm  />
  </div>
);

export default EditorForm
