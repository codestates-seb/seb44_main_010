import ConsumptionHeader from "../../components/card/ConsumptionHeader";
import  {DayPageContainer } from "../../pages/consumption/dayPageStyled";
import ConsumptionContainer from "../../containers/consumptionContainer";
import SideButtons from "../../components/button/SideButtons";
import { Grid, ContentContainer, SideButtonsContainer } from "../../pages/consumption/dayPageStyled";
import { useState } from "react";
import InputContainer from "../../containers/inputContainer";


export default function DayPage() {

  const [showInput, setShowInput] = useState(false);

  return (
    <DayPageContainer>
      <ConsumptionHeader />
      <ContentContainer>
      <Grid>
      {
        showInput ? <InputContainer />: <div style={{ width: '25vw', height: '60vh' , border: '1px solid'}}>자산프로필</div>
      }
      <ConsumptionContainer showInput={showInput} setShowInput={setShowInput}/>
      </Grid>
      <SideButtonsContainer>
      <SideButtons/>
      </SideButtonsContainer>
      </ContentContainer>
    </DayPageContainer>
  );
}


