import styles from "./loader.module.css";

const showLoader = () => {
  const root = document.querySelector("#root")!;

  const loader = document.createElement("div");
  loader.setAttribute("id", `${styles.loader}`);

  const loaderSub1 = document.createElement("div");
  loader.appendChild(loaderSub1);
  const loaderSub2 = document.createElement("div");
  loader.appendChild(loaderSub2);

  root.appendChild(loader);

  return loader;
};

export { showLoader };
