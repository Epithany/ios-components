import { motion } from "motion/react";
import AppTile from "@/components/AppTile";

export function OpenItem({
  item,
  idx,
  items,
  itemRefs,
  itemOffsets,
  offsetsReady,
}) {
  const offset = itemOffsets[item.key] ?? { x: 0, y: 0 };
  const hasLayoutId = !!item.layoutId;
  const normalItems = items.filter((item) => !item.layoutId).length;
  const previousNormalItems = items
    .slice(0, idx)
    .filter((item) => !item.layoutId).length;
  const enterDelay = offsetsReady
    ? hasLayoutId
      ? 0
      : -0.025 + previousNormalItems * 0.025
    : 0;
  const exitDelay = offsetsReady
    ? hasLayoutId
      ? 0
      : -0.095 + (normalItems - 1 - previousNormalItems) * 0.025
    : 0;

  return (
    <motion.div
      className="open-item"
      ref={(element) => {
        itemRefs.current[item.key] = element;
      }}
      initial={
        hasLayoutId
          ? { opacity: 1 }
          : offsetsReady
            ? {
                opacity: 0,
                scale: 0.2,
                x: offset.x,
                y: offset.y,
              }
            : {
                opacity: 0,
              }
      }
      animate={
        hasLayoutId
          ? { opacity: 1 }
          : offsetsReady
            ? {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }
            : {
                opacity: 0,
              }
      }
      exit={
        hasLayoutId
          ? { opacity: 1 }
          : {
              opacity: 0,
              scale: 0.2,
              x: offset.x,
              y: offset.y,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 22,
                delay: exitDelay,
                opacity: {
                  delay: 0.05,
                },
              },
            }
      }
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: enterDelay,
      }}
    >
      <div className="open-tile-box">
        <AppTile
          iconSrc={item.iconSrc}
          label={item.name}
          layoutId={item.layoutId}
        />
      </div>
      {hasLayoutId ? (
        <motion.div layoutId={`label-${item.layoutId}`} className="open-label">
          {item.name}
        </motion.div>
      ) : (
        <div className="open-label">{item.name}</div>
      )}
    </motion.div>
  );
}
