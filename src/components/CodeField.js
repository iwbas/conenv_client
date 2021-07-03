import AceEditor from 'react-ace';
import { addField } from 'react-admin';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';

const MyEditField = ({ input }) => (
  <AceEditor
    mode="c_cpp"
    theme="github"
    value={input.value}
    onChange={(val) => input.onChange(val)}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />
  // <CodeMirror
  //     ref="CodeMirror"
  //     value={beautify(input.value)}
  //     onChange={val => input.onChange(val)}
  //     options={{
  //         // Options
  //     }}
  // />
);

export default addField(MyEditField);
