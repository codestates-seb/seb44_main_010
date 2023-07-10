import ConsumptionHeader from "../../components/card/ConsumptionHeader";
import  {DayPageContainer } from "../../pages/consumption/dayPageStyled";
import ConsumptionContainer from "../../containers/consumptionContainer";

export default function DayPage() {
  return (
    <DayPageContainer>
      <ConsumptionHeader />
      <ConsumptionContainer />
    </DayPageContainer>
  );
}


