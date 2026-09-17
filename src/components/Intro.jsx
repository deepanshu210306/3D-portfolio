import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Intro.css';

/* The blade lands at 3.0s and finishes crossing at 3.16s, the cut starts
   opening at 3.45s and is clear of frame at 4.95s. */
const STRIKE_AT = 3.0;
const CUT_AT = 3.45;
const SPLIT_SWAP_AT = 3160;
const SPLIT_DELAY = CUT_AT - SPLIT_SWAP_AT / 1000;
const REVEAL_AT = 3500;
const FINISH_AT = 5000;

/* Resting values of the mark, shared by the animated build-up and by the
   frozen copies each curtain half carries off after the cut. */
const MARK_END = {
  glow: { opacity: 1, scale: 1.18 },
  ring: { opacity: 0.9, scale: 1, rotate: 75 },
  inner: { scale: 1.035 },
  kanji: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  name: { opacity: 1, y: 0, letterSpacing: '0.55em' },
  rule: { scaleX: 1 },
};

const step = (frozen, from, to, transition) =>
  frozen ? { initial: to, animate: to } : { initial: from, animate: to, transition };

const Mark = ({ frozen = false }) => (
  <div className="intro-mark">
    <motion.div
      className="intro-glow"
      {...step(frozen, { opacity: 0, scale: 0.78 }, MARK_END.glow, {
        duration: 3.1,
        ease: 'easeOut',
      })}
    />

    <motion.div
      className="intro-ring"
      {...step(frozen, { opacity: 0, scale: 0.72, rotate: 0 }, MARK_END.ring, {
        duration: 2.6,
        delay: 0.35,
        ease: [0.16, 1, 0.3, 1],
      })}
    />

    <motion.div
      className="intro-mark-inner"
      {...step(frozen, { scale: 1 }, MARK_END.inner, {
        duration: 0.75,
        delay: 2.3,
        ease: 'easeIn',
      })}
    >
      <motion.span
        className="intro-kanji"
        {...step(frozen, { opacity: 0, scale: 1.18, filter: 'blur(16px)' }, MARK_END.kanji, {
          duration: 1.35,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        })}
      >
        侍
      </motion.span>

      <motion.span
        className="intro-name"
        {...step(frozen, { opacity: 0, y: 16, letterSpacing: '0.18em' }, MARK_END.name, {
          duration: 0.95,
          delay: 1.05,
          ease: [0.16, 1, 0.3, 1],
        })}
      >
        Deepanshu
      </motion.span>

      <motion.span
        className="intro-rule"
        {...step(frozen, { scaleX: 0 }, MARK_END.rule, {
          duration: 0.7,
          delay: 1.4,
          ease: 'easeOut',
        })}
      />
    </motion.div>
  </div>
);

const Intro = ({ onReveal, onFinish }) => {
  const done = useRef(false);
  /* The curtain is one seamless layer until the blade has crossed. Splitting
     it any earlier would show the overlap between the halves. */
  const [split, setSplit] = useState(false);

  /* Sparks thrown off the blade, spaced along the cut and given a bit of
     scatter so the burst doesn't look mechanical. */
  const embers = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: 5 + (i / 17) * 90,
        drift: (Math.random() - 0.5) * 110,
        rise: -25 - Math.random() * 120,
        size: 2 + Math.random() * 3.5,
        delay: STRIKE_AT + 0.14 + Math.random() * 0.22,
        duration: 0.7 + Math.random() * 0.6,
      })),
    []
  );

  useEffect(() => {
    const settle = () => {
      if (done.current) return;
      done.current = true;
      onReveal();
      onFinish();
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      settle();
      return undefined;
    }

    const splitTimer = setTimeout(() => setSplit(true), SPLIT_SWAP_AT);
    const revealTimer = setTimeout(onReveal, REVEAL_AT);
    const finishTimer = setTimeout(() => {
      done.current = true;
      onFinish();
    }, FINISH_AT);

    const skip = () => {
      clearTimeout(splitTimer);
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
      settle();
    };

    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [onReveal, onFinish]);

  return (
    <div className="intro" aria-hidden="true">
      {/* Shaken on impact, so the whole stage recoils from the strike. */}
      <motion.div
        className="intro-stage"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -10, 8, -6, 4, -2, 0], y: [0, 6, -5, 4, -2, 1, 0] }}
        transition={{ duration: 0.55, delay: STRIKE_AT + 0.12, ease: 'linear' }}
      >
        {split ? (
          <>
            <motion.div
              className="intro-panel intro-panel--top"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ x: '-4%', y: '-108%', rotate: -1 }}
              transition={{ duration: 1.5, delay: SPLIT_DELAY, ease: [0.7, 0, 0.25, 1] }}
            >
              <Mark frozen />
            </motion.div>

            <motion.div
              className="intro-panel intro-panel--bottom"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ x: '4%', y: '108%', rotate: 1 }}
              transition={{ duration: 1.5, delay: SPLIT_DELAY, ease: [0.7, 0, 0.25, 1] }}
            >
              <Mark frozen />
            </motion.div>
          </>
        ) : (
          <div className="intro-fill">
            <Mark />
          </div>
        )}

        {/* Everything below is aligned to the cut by the wrapper's rotation. */}
        <div className="intro-slash-wrap">
          {/* Slow red trace: the blade being drawn before it lands. */}
          <motion.div
            className="intro-guide"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.35, delay: 2.05, times: [0, 0.7, 1], ease: 'easeInOut' }}
          />

          <motion.div
            className="intro-slash"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.95, delay: STRIKE_AT, times: [0, 0.17, 1], ease: 'easeOut' }}
          />

          {/* Keyframe arrays override `initial`, so every one of them has to
              start at the resting value or it shows during the delay. */}
          <motion.div
            className="intro-shockwave"
            initial={{ scaleY: 0.4, opacity: 0 }}
            animate={{ scaleY: 5, opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.7, delay: STRIKE_AT + 0.14, times: [0, 0.08, 1], ease: 'easeOut' }}
          />

          {embers.map((ember, i) => (
            <motion.span
              key={i}
              className="intro-ember"
              style={{ left: `${ember.left}%`, width: ember.size, height: ember.size }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], x: ember.drift, y: ember.rise }}
              transition={{ duration: ember.duration, delay: ember.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="intro-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.55, delay: STRIKE_AT + 0.1, times: [0, 0.13, 1] }}
      />

      <motion.span
        className="intro-skip"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, delay: 0.9, times: [0, 0.2, 0.75, 1] }}
      >
        click to skip
      </motion.span>
    </div>
  );
};

export default Intro;
