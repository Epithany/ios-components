"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import { Squircle } from "@squircle-js/react";
import AppTile from "@/components/AppTile";
import { OpenItem } from "@/lib/OpenItem";

import { isOpenContext } from "@/lib/iosLibraryProvider";

export default function AppFolder({ title, items = [] }) {
  const layoutSpring = {
    type: "spring",
    stiffness: 200,
    damping: 22,
    bounce: 0,
  };

  const { isOpen, setIsOpen } = useContext(isOpenContext);
  const miniGridRef = useRef(null);
  const itemRefs = useRef({});
  const [folderCenter, setFolderCenter] = useState(null);
  const [itemOffsets, setItemOffsets] = useState({});

  useEffect(() => {
    for (const e of items) {
      const a = new Image();
      a.src = e.iconSrc;
    }
  }, [items]);
  const openFolder = () => {
    const rect = miniGridRef.current?.getBoundingClientRect();
    if (rect) {
      setFolderCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsOpen(true);
  };
  useLayoutEffect(() => {
    if (!isOpen || !folderCenter) return;

    const offsets = {};

    let ready = true;

    items.forEach((item) => {
      const element = itemRefs.current[item.key];

      if (!element) {
        ready = false;
        return;
      }

      const rect = element.getBoundingClientRect();

      offsets[item.key] = {
        x: folderCenter.x - (rect.left + rect.width / 2),
        y: folderCenter.y - (rect.top + rect.height / 2),
      };
    });

    if (ready) {
      setItemOffsets(offsets);
    }
  }, [isOpen, folderCenter, items]);

  const offsetsReady =
    isOpen && folderCenter && Object.keys(itemOffsets).length === items.length;

  return (
    <MotionConfig transition={layoutSpring}>
        <div className="w-fit">
          <AnimatePresence
            mode="popLayout"
            initial={false}
            onExitComplete={() => {
              if (!isOpen) {
                setItemOffsets({});
                setFolderCenter(null);
              }
            }}
          >
            {!isOpen ? (
              <motion.div
                key="closed"
                className="w-fit"
                onClick={openFolder}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 22,
                }}
              >
                <Squircle
                  cornerRadius={36}
                  cornerSmoothing={0.6}
                  className="folder-preview"
                >
                  <div className="folder-grid">
                    {items
                      .filter((item) => !item.layoutId)
                      .slice(0, 3)
                      .map((item) => (
                        <AppTile
                          key={item.key}
                          iconSrc={item.iconSrc}
                          label={item.name}
                        />
                      ))}
                    <div className="mini-grid" ref={miniGridRef}>
                      {items
                        .filter((item) => item.layoutId)
                        // .slice(0, 4)
                        .map((item) => (
                          <div className="mini-cell" key={item.key}>
                            <AppTile
                              iconSrc={item.iconSrc}
                              label={item.name}
                              layoutId={item.layoutId}
                            />
                            <motion.div
                              layoutId={`label-${item.layoutId}`}
                              className="mini-label"
                              style={{ opacity: 0 }}
                            >
                              {item.name}
                            </motion.div>
                          </div>
                        ))}
                    </div>
                  </div>
                </Squircle>
                <div className="folder-name">{title}</div>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                className="open-overlay"
                onClick={() => setIsOpen(false)}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    delay: 0.025,
                  },
                }}
              >
                <div className="open-folder">
                  <motion.div
                    className="open-title"
                    initial={{
                      opacity: 0,
                      y: 30,
                      x: 10,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 30,
                      x: 10,
                      scale: 0.8,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 19,
                    }}
                  >
                    {title}
                  </motion.div>
                  <div className="open-grid">
                    {items.map((item, index) => (
                      <OpenItem
                        key={
                          item.layoutId
                            ? item.key
                            : `${item.key}-${offsetsReady ? "ready" : "wait"}`
                        }
                        item={item}
                        idx={index}
                        items={items}
                        itemRefs={itemRefs}
                        itemOffsets={itemOffsets}
                        offsetsReady={offsetsReady}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Stylesheet />
      </MotionConfig>
  );
}

function Stylesheet() {
  return (
    <style>
      {`
               #example {
                   width: 100%;
                   min-height: 100vh;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
               }
   
               #example *,
               #example *::before,
               #example *::after {
                   box-sizing: border-box;
               }
   
               .closed-root {
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   gap: 12px;
                   user-select: none;
                   will-change: transform;
               }
   
               .folder-preview {
                   position: relative;
                   border-radius: 26px;
                   padding: 12px;
                   background: rgba(255, 255, 255, 0.35);
                   backdrop-filter: blur(18px);
                   -webkit-backdrop-filter: blur(18px);
                   box-shadow: 0 18px 40px rgba(0,0,0,0.18);
                   border: 1px solid rgba(0,0,0,0.06);
               }
   
               .folder-grid {
                   display: grid;
                   grid-template-columns: repeat(2, 55px);
                   grid-template-rows: repeat(2, 55px);
                   gap: 10px;
               }
   
               .mini-grid {
                   display: grid;
                   grid-template-columns: repeat(2, 25px);
                   grid-template-rows: repeat(2, 25px);
                   gap: 5px;
                   cursor: pointer;
                   transition: opacity 200ms ease, transform 200ms ease;
               }
   
               .mini-grid:hover {
                   opacity: 0.85;
               }
   
               .mini-grid:active {
                   transform: scale(0.95);
               }
   
               .mini-cell {
                   position: relative;
                   aspect-ratio: 1;
               }
   
               .mini-label {
                   position: absolute;
                   left: 50%;
                   top: 100%;
                   transform: translateX(-50%);
                   margin-top: 0.5rem;
                   font-size: 0.85rem;
                   font-weight: 500;
                   color: var(--text);
                   pointer-events: none;
                   white-space: nowrap;
               }
   
               .folder-name {
                   font-size: 0.95rem;
                   line-height: 1;
                   font-weight: 500;
                   color: var(--text);
               }
   
               .tile {
                   width: 100%;
                   height: 100%;
                   will-change: transform;
               }
   
               .open-overlay {
                   position: fixed;
                   inset: 0;
                   z-index: 9999;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   will-change: transform;
               }
   
               .open-folder {
                   position: relative;
                   border-radius: 1.65rem;
                   padding: 24px;
                   will-change: transform;
                   display: flex;
                   flex-direction: column;
                   align-items: center;
               }
   
               .open-title {
                   text-align: center;
                   width: 100%;
                   font-size: 1.25rem;
                   font-weight: 600;
                   color: var(--text);
                   will-change: transform;
               }
   
               .open-grid {
                   margin-top: 24px;
                   display: grid;
                   grid-template-columns: repeat(4, 1fr);
                   column-gap: 24px;
                   row-gap: 20px;
                   justify-items: center;
               }
   
               .open-item {
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   will-change: transform;
               }
   
               .open-tile-box {
                   width: 4.25rem;
                   height: 4.25rem;
               }
   
               .open-label {
                   margin-top: 0.5rem;
                   font-size: 0.85rem;
                   font-weight: 500;
                   color: var(--text);
                   white-space: nowrap;
               }
           `}
    </style>
  );
}
