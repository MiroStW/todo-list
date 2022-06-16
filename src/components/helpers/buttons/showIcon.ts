import globalStyles from "style.module.css";

// change to showIcon
// change properties to be passed inside an object
const showIcon = (
  parent: Element,
  iconName: string,
  style: "filled" | "outlined" = "filled",
  size: 18 | 20 | 24 = 18
) => {
  const icon = document.createElement("span");
  if (style === "outlined") {
    icon.classList.add("material-icons-outlined");
  } else {
    icon.classList.add("material-icons");
  }
  icon.classList.add(globalStyles[`md-${size}`]);
  icon.textContent = iconName;
  parent.appendChild(icon);

  return icon;
};

export default showIcon;
