import Header from "@/components/header";
import PageWrapper from "../../components/page";

import { AddNewPortfolio } from "@/components/ui/add-new-portfolio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PortfolioCard } from "@/components/ui/portfolio-card";
import { getPortfoliosWithPnl } from "@/lib/portfolios";

const DashboardPage = async () => {
  const portfolios = await getPortfoliosWithPnl();
  return (
    <PageWrapper
      header={
        <Header
          title="All portfolios"
          navItems={[]}
          button={<AddNewPortfolio />}
        />
      }
    >
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
      </Carousel>
    </PageWrapper>
  );
};

export default DashboardPage;
