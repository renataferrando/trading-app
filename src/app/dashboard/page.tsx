import Header from "@/components/header";
import PageWrapper from "@/components/page";

import { AddNewPortfolio } from "@/components/add-new-portfolio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

import { PortfolioCard } from "@/components/portfolio-card";
import { getPortfoliosWithPnl } from "@/lib/portfolios";

const DashboardPage = async () => {
  const portfolios = await getPortfoliosWithPnl();
  console.log(portfolios);
  return (
    <PageWrapper
      header={
        <Header
          title="All portfolios"
          navItems={[]}
          button={<AddNewPortfolio />}
        />
      }
      centerContent
    >
      <div className="flex-grow flex flex-col justify-center items-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl"
        >
          <CarouselContent>
            {portfolios.map((portfolio, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <PortfolioCard
                    portfolioId={portfolio.id}
                    name={portfolio.name}
                    initialValue={Number(portfolio.initialValue)}
                    currentValue={
                      portfolio.currentValue
                        ? Number(portfolio.currentValue)
                        : undefined
                    }
                    pnl={portfolio.pnl ?? []}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
