import * as S from "../../pages/asset/assetPageStyled";
import AssetHeader from "../../components/card/AssetHeader";
import SavingAccount from "../../components/card/SavingAccount";
import Stock from "../../components/card/Stock";
import AddProperty from "../../components/card/AddProperty";
import AddCar from "../../components/card/AddCar";
import AddCash from "../../components/card/AddCash";

export default function AssetPage() {
  return (
    <S.AssetPageContainer>
      <AssetHeader />
      <S.SavingAccountBox>
        <S.Title>입출금 계좌</S.Title>
        <SavingAccount />
        <S.Title>증권 계좌</S.Title>
        <Stock />
        <S.AddButtons>
          <AddProperty />
          <AddCar />
          <AddCash />
        </S.AddButtons>
      </S.SavingAccountBox>
    </S.AssetPageContainer>
  );
}
