import * as S from "../../pages/asset/assetPageStyled";
import AssetHeader from "../../components/card/Asset/AssetHeader";
import AssetProfileContainer from "../../containers/assetProfileContainer";
import SavingAccount from "../../components/card/Asset/SavingAccount";
import Stock from "../../components/card/Asset/Stock";
import Property from "../../components/card/Asset/PropertyList";
import Car from "../../components/card/Asset/CarList";
import Cash from "../../components/card/Asset/CashList";
import AddProperty from "../../components/card/Asset/AddProperty";
import AddCar from "../../components/card/Asset/AddCar";
import AddCash from "../../components/card/Asset/AddCash";

export default function AssetPage() {
  return (
    <>

    <AssetHeader />
    <S.AssetPageContainer>
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

    </>
  );
}
