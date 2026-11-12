'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import { listV, itemV, tMove } from '@/lib/motion';
import { POST_LIST, SQ } from './Posts';
import { POSTER_LIST, PW, PH } from './Posters';
import { STORY_LIST, SW, SH } from './Stories';
import { Billboard, EventScreen, BILL, SCREEN } from './Wide';
import { ProfileGrid, PosterCycle } from './Grid';
import { FramedPosters, PLATE_W, PLATE_H } from './Plate';
import s from './campaign.module.css';

// One artboard in a wrapper that animates in and lifts on hover (framer-motion moves the wrapper, never the artwork).
function Piece({ name, title, box, caption, note, children, className = '' }) {
  return (
    <motion.figure className={`${s.piece} ${className}`} variants={itemV} whileHover={{ y: -6 }} transition={tMove}>
      <Art viewBox={`0 0 ${box[0]} ${box[1]}`} title={title} exportName={`campaign-${name}`} className={s.art}>
        {children}
      </Art>
      <figcaption className={s.cap}>
        <span>{caption}</span>
        {note && <span className="muted">{note}</span>}
      </figcaption>
    </motion.figure>
  );
}

function Head({ n, title, lead }) {
  return (
    <div className={s.head}>
      <span className={`t-label ${s.no}`}>{n}</span>
      <h2 className="t-h2">{title}</h2>
      {lead && <p className="t-body muted">{lead}</p>}
    </div>
  );
}

const list = { variants: listV, initial: 'hidden', animate: 'show' };

export default function Board() {
  const [n, setN] = useState(0);
  return (
    <div>
      <div className={`wrap ${s.bar}`}>
        <p className="t-small muted">Posts, posters, stories and a profile grid, all drawn as SVG.</p>
        <Button size="sm" variant="outline" onClick={() => setN((v) => v + 1)}>Replay</Button>
      </div>

      <div key={n}>
        <section className="wrap band" aria-label="Posts">
          <Head n="01" title="Posts" lead="Four square posts, each with its own layout, and the hard-cut poster cycle of the case study." />
          <div className={s.split}>
            <motion.div className={s.posts} {...list}>
              {POST_LIST.map((p) => (
                <Piece key={p.key} name={`post-${p.key}`} title={p.title} box={[SQ, SQ]} caption={p.title} note="1080 × 1080">
                  {p.node()}
                </Piece>
              ))}
            </motion.div>
            <motion.div className={s.cycle} {...list}>
              <Piece name="poster-cycle" title="Poster grid cycle, hard cuts at 100 ms" box={[PW, PH]} caption="Hard-cut cycle" note="8 frames, 100 ms each">
                <PosterCycle />
              </Piece>
            </motion.div>
          </div>
        </section>

        <section className="field-black band" aria-label="Posters">
          <div className="wrap">
            <Head n="02" title="Posters" lead="The four sheets of the case study, rebuilt on a 3:4 sheet, then the billboard and the event screen." />
            <motion.div className={s.posters} {...list}>
              {POSTER_LIST.map((p) => (
                <Piece key={p.key} name={`poster-${p.key}`} title={p.title} box={[PW, PH]} caption={p.title} note={`Rebuild of ${p.from}`}>
                  {p.node(`campaign-poster-${p.key}`)}
                </Piece>
              ))}
            </motion.div>
            <motion.div className={s.wide} {...list}>
              <Piece name="billboard" title="Billboard panel" box={[BILL.w, BILL.h]} caption="Billboard panel" note="Rebuild of m19">
                <Billboard />
              </Piece>
              <Piece name="event-screen" title="Event screen" box={[SCREEN.w, SCREEN.h]} caption="Event screen" note="Rebuild of m22">
                <EventScreen />
              </Piece>
            </motion.div>
          </div>
        </section>

        <section className="wrap band" aria-label="Framed posters">
          <Head n="03" title="Posters in frames" lead="Three sheets hung in a row at eye level, each labelled on its own leader line." />
          <motion.div className="mock" {...list}>
            <motion.div variants={itemV}>
              <Art viewBox={`0 0 ${PLATE_W} ${PLATE_H}`} title="Three framed posters on a dark stage" exportName="campaign-mockup-frames">
                <FramedPosters />
              </Art>
            </motion.div>
          </motion.div>
        </section>

        <section className="field-periwinkle band" aria-label="Stories">
          <div className="wrap">
            <Head n="04" title="Stories" lead="Five vertical pieces, each built on its own structure." />
            <motion.div className={s.stories} {...list}>
              {STORY_LIST.map((p) => (
                <Piece key={p.key} name={`story-${p.key}`} title={p.title} box={[SW, SH]} caption={p.title} note="1080 × 1920">
                  {p.node()}
                </Piece>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="field-dark band" aria-label="Profile grid">
          <div className="wrap">
            <Head n="05" title="Profile grid" lead="Nine square tiles, drawn without any platform chrome." />
            <motion.div className={s.grid} {...list}>
              <Piece name="profile-grid" title="Profile grid, three by three" box={[1080, 1080]} caption="Profile grid" note="3 × 3 tiles">
                <ProfileGrid />
              </Piece>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
