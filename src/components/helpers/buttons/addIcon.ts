import globalStyles from "style.module.css";

const addIcon = (parent: Element, iconName: string, style?: "outlined") => {
  const icon = document.createElement("span");
  if (style === "outlined") {
    icon.classList.add("material-icons-outlined");
  } else {
    icon.classList.add("material-icons");
  }
  icon.classList.add(globalStyles["md-18"]);
  icon.textContent = iconName;
  parent.appendChild(icon);

  return icon;
};

export default addIcon;