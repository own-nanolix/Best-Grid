// The sections of the event page. Each plate is one exportable SVG inside a .mock stage frame with a plain caption.
import Reveal from '@/components/site/Reveal';
import Booth from './Booth';
import Badge from './Badge';
import { IdPlateA, IdPlateB } from './Ids';
import { FabricA, FabricB, FabricC, FabricD, SiliconeA, SiliconeB, SiliconeC, Fan } from './Bands';
import { TicketA, TicketB, TicketC, VipPass } from './Tickets';
import { FlagA, FlagB, FlagC, Banner } from './Flags';
import s from './use-event.module.css';

function Fig({ name, no, delay = 0, children }) {
  return (
    <Reveal delay={delay}>
      <figure className={s.fig}>
        <div className="mock">{children}</div>
        <figcaption className="mock-cap"><span>{name}</span><span>{no}</span></figcaption>
      </figure>
    </Reveal>
  );
}

function Sec({ title, count, label, children }) {
  return (
    <section className={s.sec} aria-labelledby={`use-event-${label}`}>
      <div className={s.sechead}>
        <h2 className="t-h2" id={`use-event-${label}`}>{title}</h2>
        <span className={s.count}>{count}</span>
      </div>
      {children}
    </section>
  );
}

export function Opening() {
  return (
    <div className="wrap">
      <Sec title="Exhibition booth" count="1 plate" label="booth">
        <Fig name="Exhibition booth" no="00"><Booth /></Fig>
      </Sec>
    </div>
  );
}

export function Credentials() {
  return (
    <div className="wrap">
      <Sec title="Badge, staff IDs, flags and banner" count="8 plates" label="badge">
        <div className={s.badgeRow}>
          <Fig name="Lanyard with speaker badge" no="01"><Badge /></Fig>
          <div className={s.small}>
            <Fig name="Staff IDs, Dark Blue and Light Blue" no="02" delay={60}><IdPlateA /></Fig>
            <Fig name="Staff IDs, Active Blue and Dark Blue" no="03" delay={120}><IdPlateB /></Fig>
            <Fig name="Feather flag, 4500 mm" no="16" delay={60}><FlagA /></Fig>
            <Fig name="Feather flag, 3500 mm" no="17" delay={120}><FlagB /></Fig>
            <Fig name="Feather flag, 2500 mm" no="18" delay={60}><FlagC /></Fig>
            <Fig name="Hanging banner" no="19" delay={120}><Banner /></Fig>
          </div>
        </div>
      </Sec>
    </div>
  );
}

export function Tickets() {
  return (
    <div className="wrap">
      <Sec title="Tickets and VIP pass" count="4 plates" label="tickets">
        <div className={s.row4}>
          <Fig name="Ticket, paper" no="12"><TicketA /></Fig>
          <Fig name="Ticket, Dark Blue" no="13" delay={60}><TicketB /></Fig>
          <Fig name="Ticket, Active Blue" no="14" delay={120}><TicketC /></Fig>
          <Fig name="VIP pass" no="15" delay={180}><VipPass /></Fig>
        </div>
      </Sec>
    </div>
  );
}

export function Wristbands() {
  return (
    <div className="wrap">
      <Sec title="Wristbands, fabric" count="4 plates" label="fabric">
        <div className={s.row4}>
          <Fig name="Fabric, Active Blue" no="04"><FabricA /></Fig>
          <Fig name="Fabric, Dark Blue" no="05" delay={60}><FabricB /></Fig>
          <Fig name="Fabric, Light Blue" no="06" delay={120}><FabricC /></Fig>
          <Fig name="Fabric, Periwinkle" no="07" delay={180}><FabricD /></Fig>
        </div>
      </Sec>
      <Sec title="Wristbands, silicone" count="3 plates" label="silicone">
        <div className={s.row3}>
          <Fig name="Silicone, Active Blue" no="08"><SiliconeA /></Fig>
          <Fig name="Silicone, Dark Blue" no="09" delay={60}><SiliconeB /></Fig>
          <Fig name="Silicone, Light Blue" no="10" delay={120}><SiliconeC /></Fig>
        </div>
      </Sec>
      <Sec title="Wristband range" count="1 plate" label="fan">
        <Fig name="Seven wristbands in a fan" no="11"><Fan /></Fig>
      </Sec>
    </div>
  );
}
