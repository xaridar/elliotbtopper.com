import { LogoCarousel } from '@/components/logo_carousel';
import Image from 'next/image';

export default function Home() {
    return <LogoCarousel productNames={['Ruby', 'Ruby on Rails', 'Node.js']} />;
}

