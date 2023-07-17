import * as S from "../../pages/asset/assetPageStyled";
import AssetHeader from "../../components/card/AssetHeader";
import AssetProfileContainer from "../../containers/assetProfileContainer";
import SavingAccount from "../../components/card/SavingAccount";
import Stock from "../../components/card/Stock";
import Property from "../../components/card/PropertyList";
import Car from "../../components/card/CarList";
import Cash from "../../components/card/CashList";
import AddProperty from "../../components/card/AddProperty";
import AddCar from "../../components/card/AddCar";
import AddCash from "../../components/card/AddCash";

export default function AssetPage() {
  return (
    <S.AssetPageContainer>
      <AssetHeader />
      <S.ContentContainer>
        <AssetProfileContainer />
        <S.Grid>
          <S.Title>입출금 계좌</S.Title>
          <SavingAccount />
          <S.Title>증권 계좌</S.Title>
          <Stock />
          {Property() && <S.Title>부동산</S.Title>}
          {Property && <Property />}
          {Car() && <S.Title>자동차</S.Title>}
          {Car && <Car />}
          {Cash() && <S.Title>현금</S.Title>}
          {Cash && <Cash />}
          <S.AddButtons>
            <AddProperty />
            <AddCar />
            <AddCash />
          </S.AddButtons>
        </S.Grid>
      </S.ContentContainer>
    </S.AssetPageContainer>
  );
}
