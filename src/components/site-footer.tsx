import Link from "next/link";
import Image from "next/image";
import { showcaseEvent, photographyNote } from "@/lib/content";
import { Icon } from "@/components/icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-intro">
          <Link className="brand brand-footer" href="/" aria-label="Chelmsford College home">
            <Image
              src="/images/chelmsford-college-logo.png"
              alt="Chelmsford College"
              width={213}
              height={42}
              className="brand-logo"
            />
          </Link>
          <p>Make your next move matter. Find a course, get advice and see what college life could look like for you.</p>
          <Link className="footer-find-link" href="/courses">Explore courses <Icon name="arrow" size={18} /></Link>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <Link href="/courses">Courses</Link>
          <Link href="/events">Events</Link>
          <Link href="/#college-life">College life</Link>
          <Link href="/payments">Make a payment</Link>
        </div>
        <div className="footer-column">
          <h2>Get in touch</h2>
          <p className="footer-contact-label">{showcaseEvent.contact.name}</p>
          <a href={`tel:${showcaseEvent.contact.phone.replaceAll(" ", "")}`}><Icon name="phone" size={16} />{showcaseEvent.contact.phone}</a>
          <a href={`mailto:${showcaseEvent.contact.email}`}><Icon name="mail" size={16} />{showcaseEvent.contact.email}</a>
          <p className="footer-note">Careers advice and open-evening support</p>
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>© Chelmsford College · Interactive prototype</p>
        <p className="photo-credit">{photographyNote}</p>
        <div className="footer-tools"><Link href="/design-system">Design system</Link><Link href="/cms">CMS demo</Link></div>
      </div>
    </footer>
  );
}
