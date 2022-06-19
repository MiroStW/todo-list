import globalStyles from "style.module.css";

// change properties to be passed inside an object
const showIcon = ({
  parent,
  iconName,
  style = "filled",
  size = 18,
  color,
}: {
  parent: Element;
  iconName: string;
  style?: "filled" | "outlined";
  size?: 18 | 20 | 24;
  color?: string;
}) => {
  const icon = document.createElement("span");
  if (style === "outlined") {
    icon.classList.add("material-icons-outlined");
  } else {
    icon.classList.add("material-icons");
  }
  icon.classList.add(globalStyles[`md-${size}`]);
  if (color) icon.classList.add(globalStyles[color]);
  icon.textContent = iconName;
  parent.appendChild(icon);

  return icon;
};

export default showIcon;
