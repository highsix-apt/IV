const wrapper = document.getElementById("chains");

function createChain({ angle, x, y = "-200vh", units = 60 }) {
  const chain = document.createElement("div");
  chain.className = "chain";

  chain.style.setProperty("--angle", angle + "deg");
  chain.style.setProperty("--x", x);
  chain.style.setProperty("--y", y);

  for (let i = 0; i < units; i++) {
    const unit = document.createElement("div");
    unit.className = "chain-unit";
    unit.style.setProperty("--i", i);

    const wrap = document.createElement("div");
    wrap.className = "chain-link wrap";

    const main = document.createElement("div");
    main.className = "chain-link main";

    unit.appendChild(wrap);
    unit.appendChild(main);

    chain.appendChild(unit);
  }

  wrapper.appendChild(chain);
}

createChain({ angle: 85, x: "-45vw" });
createChain({ angle: 80, x: "-4vw" });
createChain({ angle: 10, x: "-200vw", y: "20vh" });
createChain({ angle: 0, x: "-200vw", y: "20vh" });
createChain({ angle: 150, x: "2800px" });
createChain({ angle: 290, x: "500px", y: "3000px" });
