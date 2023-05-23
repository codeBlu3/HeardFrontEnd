import { RSBody } from "./RSText";
import { styles } from "../theme/styles";

export function MarkdownText(props) {
const { children, ...rest} = props
  const  origText = props.children[1];
  let workingText = origText.slice() 

  
  const reBoldItalic = /(\*|\_){3}(.*)(\*|\_){3}/g;
  const reBold = /(\*|\_){2}(.*)(\*|\_){2}/g;
  const reItalic = /(\*|\_){1}(.*)(\*|\_){1}/g;


  let textOrder = [];

  //generate all regex matches
  //for refactoring
  const matchBoldItalic = workingText.matchAll(reBoldItalic);
  for (const match of matchBoldItalic) {
    const matchStat = {
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "boldItalic",
    };
    textOrder.push(matchStat);
    workingText =  workingText.replace(match[0], " ".repeat(match[0].length)) //not good per performance standpoint
  }

  const matchBold = workingText.matchAll(reBold);
  for (const match of matchBold) {
    const matchStat = {
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "bold",
    };
    textOrder.push(matchStat);

    workingText =  workingText.replace(match[0], " ".repeat(match[0].length)) //not good per performance standpoint
  }

  const matchItalic = workingText.matchAll(reItalic);
  for (const match of matchItalic) {
    const matchStat = {
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "italic",
    };
    textOrder.push(matchStat);

    workingText =  workingText.replace(match[0], " ".repeat(match[0].length)) //not good per performance standpoint
  }

let cursor  = 0
  const mdArr = [];
  if (textOrder.length != 0)  {
  textOrder = textOrder.sort((a, b) => {
    return a.start - b.start;
  });


for (const [index, value ] of textOrder.entries()) {
    if (cursor <value.start ) {

const matchStat = {
      word: origText.slice(cursor, value.start),
      start: cursor,
      end: value.start, 
      type: "normal",
    };
    textOrder.push(matchStat);
    cursor = value.end
    }
}

  textOrder = textOrder.sort((a, b) => {
    return a.start - b.start;
  });

  for (const item of textOrder) {
    let elem;
    if (item.type == "boldItalic") {
      elem = (
        <RSBody style={styles.boldItalic}>
          {origText.slice(item["start"] + 3, item["end"] - 3)}
        </RSBody>
      );
    } else if (item.type == "bold") {
      elem = (
        <RSBody style={styles.bold}>
          {origText.slice(item["start"] + 2, item["end"] - 2)}
        </RSBody>
      );
    } else if (item.type == "italic") {
      elem = (
        <RSBody style={styles.italic}>
          {origText.slice(item["start"] + 1, item["end"] - 1)}
        </RSBody>
      );
    } else {
      elem = origText.slice(item["start"], item["end"]);
    }

    mdArr.push(elem);
  }

}
else {
    mdArr.push(origText);
}

  return <RSBody {...rest}>{mdArr}</RSBody>;
}

