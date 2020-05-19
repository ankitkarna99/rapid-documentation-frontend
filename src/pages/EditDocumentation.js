import React from "react";
import MonacoEditor from "react-monaco-editor";
import Axios from "axios";
import Toaster from "../Toaster";

export default function EditDocumentation({ match, history, location }) {
  const bookSlug = match.params.bookSlug || "";
  const pageSlug = match.params.pageSlug || "index";
  const subPageSlug = match.params.subPageSlug || "";
  const editorModel = React.useRef(null);

  const [documentation, setDocumentation] = React.useState({
    content: "",
    type: "html",
    title: "",
  });

  const getDocumentation = () => {
    let URL = "";
    if (subPageSlug.length === 0) {
      URL = "/book/" + bookSlug + "/" + pageSlug;
    } else {
      URL = "/book/" + bookSlug + "/" + pageSlug + "/" + subPageSlug;
    }

    Axios.get(URL)
      .then(({ data }) => {
        setDocumentation(data);
      })
      .catch(err => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          Toaster.toast("error", err.response.data.message);
        }

        setTimeout(getDocumentation, 2000);
      });
  };

  React.useEffect(() => {
    getDocumentation();
    //eslint-disable-next-line
  }, [match.params]);

  const editorDidMount = (editor, monaco) => {
    editorModel.current = editor.getModel();
    editor.focus();
  };
  const onChange = (newValue, e) => {};

  const saveChanges = () => {
    let URL;
    if (subPageSlug.length === 0) {
      URL = "/book/" + bookSlug + "/" + pageSlug + "/edit";
    } else {
      URL = "/book/" + bookSlug + "/" + pageSlug + "/" + subPageSlug + "/edit";
    }
    Axios.patch(URL, {
      content: editorModel.current.getValue(),
    })
      .then(({ data }) => {
        Toaster.toast("success", data.message);
      })
      .catch(err => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          Toaster.toast("error", err.response.data.message);
        }
      });
  };

  const viewDocumentation = () => {
    const newURL = location.pathname.replace("/edit", "");
    history.push(newURL);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{documentation.title}</h3>
        <div>
          <button
            onClick={viewDocumentation}
            className="uk-button uk-button-default"
          >
            View Documentation
          </button>
        </div>
      </div>
      <MonacoEditor
        width="100%"
        height="300"
        language={documentation.type === "html" ? "html" : "markdown"}
        theme="vs-dark"
        value={documentation.content}
        options={{
          selectOnLineNumbers: true,
        }}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <p className="uk-text-right">
        <button onClick={saveChanges} className="uk-button uk-button-primary">
          Save Changes
        </button>
      </p>
    </div>
  );
}
