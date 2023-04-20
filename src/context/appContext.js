import React, { useState, createContext, useEffect } from "react";
import { getFirebaseApp, anonymousAuthentication } from "../utils/firebase";
import {
  fetchConfigVariable,
  fetchConfigVariablesBatch,
} from "../utils/handleConfigVars";

/* 
-----------------------------------------------------------------

-----------------------------------------------------------------
 */
/* TODO: CENTRALIZE THE READING OF CONFIG PARAMETERS IN APP.js */

/* const firebaseConfig = {
  apiKey: "REACT_APP_FIREBASE_API_KEY",
  authDomain: "REACT_APP_FIREBASE_AUTH_DOMAIN",
  projectId: "REACT_APP_FIREBASE_PROJECT_ID",
  storageBucket: "REACT_APP_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  appId: REACT_APP_FIREBASE_APP_ID,
}; */
export const AppContext = createContext();
export const AppProvider = (props) => {
  //console.log(props)
  const firebaseConfig = fetchConfigVariablesBatch([
    "REACT_APP_FIREBASE_API_KEY",
    "REACT_APP_FIREBASE_AUTH_DOMAIN",
    "REACT_APP_FIREBASE_PROJECT_ID",
    "REACT_APP_FIREBASE_STORAGE_BUCKET",
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    "REACT_APP_FIREBASE_APP_ID",
    "REACT_APP_FIREBASE_ROOT_DIRECTORY",
  ]);
  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  /* todo: 1) figure out the use case for this field in the ouptput json 
  (e.g will this be used for A/B test? or indicating that a deployment is a debug/dev version...)
           2) Decide whether it should be possible to configure externally 
               or not (via environment varibles, similar to firebase variables) */

  const getCurrentPageIndex = () => {
    return setPageLocator(parseInt(localStorage.getItem("PageLocator"), 10));
  };
  const getCasesCount = () => {
    let casesArray = JSON.parse(localStorage.getItem("CaseOrder"));
    return casesArray ? casesArray.length : 0;
  };

  const [PageLocator, setPageLocator] = useState(
    parseInt(localStorage.getItem("PageLocator"), 10) || 0
  );
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [clientUid, setClientId] = useState("");
  const [casesCount, setCasesCount] = useState(0);
  const [currentDemonstrationPageIndex, setCurrentDemonstrationPageIndex] =
    useState(0);

  const rootDirectory = firebaseConfig.REACT_APP_FIREBASE_ROOT_DIRECTORY;
  useEffect(() => {
    /* ON WEB APP (1) LOAD, INITIALIZE A FIREBASE APP (2) AND AUTHENTICATE (1) ANONYMOUSLY  */
    getFirebaseApp();
    (async () => {
      let uid = await anonymousAuthentication();
      setClientId(uid);
    })();
    setPageLocator(getCurrentPageIndex);
    PageLocator && setPageLocator(PageLocator);
  }, [setPageLocator, PageLocator]);

  const value = {
    disableNextButton,
    setDisableNextButton,
    getCurrentPageIndex,
    PageLocator,
    setPageLocator,
    firebaseConfig,
    rootDirectory, // todo: pass rootDirectory inside firebaseConfig
    clientUid,
    casesCount,
    REACT_APP_general,
    setCasesCount,
    getCasesCount,
    currentDemonstrationPageIndex,
    setCurrentDemonstrationPageIndex,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
