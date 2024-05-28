interface LogoCarouselProps {
  productNames: string[];
}

export const LogoCarousel = (props: LogoCarouselProps) => {
  return (
    <div>
      {props.productNames.map((name) => (
        <>{name}</>
      ))}
    </div>
  );
};
