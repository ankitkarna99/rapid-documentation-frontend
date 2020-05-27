import React from "react";
import Axios from "axios";
import Toaster from "../Toaster";
import DocViewer from "../components/DocViewer";
import RightNav from "../components/RightNav";

// apis
const getBookJSON = ({ bookSlug }) => {
  return Axios.get("/book/" + bookSlug)
};

const getDocumentation = ({ bookSlug, pageSlug, subPageSlug }) => {
  let URL = "";
  if (subPageSlug.length === 0) {
    URL = "/book/" + bookSlug + "/" + pageSlug;
  } else {
    URL = "/book/" + bookSlug + "/" + pageSlug + "/" + subPageSlug;
  }
  return Axios.get(URL)
};

const initializeData = async ({ bookSlug, pageSlug, subPageSlug }) => {
  const { data: documentation } = await getDocumentation({ bookSlug, pageSlug, subPageSlug });
  const { data: bookJSON } = await getBookJSON({ bookSlug });

  let pageJSON = {}

  if (bookJSON.pages) {
    const matchedPages = bookJSON.pages.filter(
      page => page.slug === pageSlug
    )
    if (matchedPages.length > 0) {
      pageJSON = matchedPages[0]
    }
  }

  return {
    documentation,
    bookJSON,
    pageJSON,
  }
}


export default function ViewDocumentation({ history, match }) {
  const bookSlug = match.params.bookSlug || "";
  const pageSlug = match.params.pageSlug || "index";
  const subPageSlug = match.params.subPageSlug || "";

  const [isLoading, setIsLoading] = React.useState(true)

  const [ pageData, setPageData ] = React.useState(
    {
      documentation: {
        content: "",
        type: "html",
        title: "",
      },
      bookJSON: {},
      pageJSON: {}
    }
  )

  React.useEffect( () => {
    setIsLoading(true)

    const initializePageAsync = async () => {
      try{
        const { documentation, bookJSON, pageJSON } = await initializeData({ bookSlug, pageSlug, subPageSlug })

        setPageData({
          documentation,
          bookJSON,
          pageJSON
        })

        setIsLoading(false)
      }
      catch(err){
        console.error(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          Toaster.toast("error", err.response.data.message);
        }
        
        /*
          note: if error this recursive logic will make page irresponsive
          instead prompt user to refresh
        */
        // setTimeout(initializePageAsync(), 2000);
      }
    }

    initializePageAsync()

    // eslint-disable-next-line
  }, [bookSlug, pageSlug, subPageSlug]);
  
  return (
    <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
      <div>
        {
          isLoading ? <div> Loading... </div>
          : <DocViewer content={pageData.documentation.content} type={pageData.documentation.type} />
        }
      </div>
      <RightNav pageJSON={pageData.pageJSON} />
    </div>
  );
}
