import {motion} from "motion/react"

export default function AppTile({ iconSrc, label, layoutId }) {
  return (
    <motion.img
      className="app-tile"
      src={iconSrc}
      alt={label}
      aria-label={label}
      layoutId={layoutId}
      draggable={false}
    />
  );
}

function stylesheet(){
  return (`
    .app-tile {
         position: absolute;
         left: 50%;
         top: 50%;
         translate: -50% -50%;
         background: black;
         border-radius: 36px;
         height: 200px;
         width: 200px;;

         display: flex;
         align-items: center;
         justify-content: center;
         color: white;
         font-size: 128px;
         cursor: pointer;
         transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      .app-tile:hover {
         scale: 1.3;
      }
    `)
}