import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import ContactSection from '../components/ContactSection';
import DiscountBanner from '../components/DiscountBanner';
import SaleSection from '../components/SaleSection';

export default function Home() {
    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 0' }}>
            <HeroSection />
            <CategoriesSection />
            <DiscountBanner />
            <SaleSection />
            <ContactSection />
        </div>
    );
}
