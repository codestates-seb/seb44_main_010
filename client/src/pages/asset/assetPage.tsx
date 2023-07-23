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
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { useDispatch } from "react-redux";
import { getLocalstorage } from "../../util/localStorage";
import { addProfile } from "../../redux/profileSlice";

export default function AssetPage() {
  const [assetdata, setAssetdata] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const currentData = new Date();
    const currentMonth = currentData.getMonth() + 1;
    const userId = getLocalstorage("userId");
    const acessToken = getLocalstorage("acessToken");

    axios.defaults.headers.common["Authorization"] = acessToken;
    axios
      .get(`/asset/myInfo/${userId}/${currentMonth}`, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(addProfile(res.data));
        setAssetdata(res.data.data);
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          window.alert(errMessage);
          console.log(errMessage);
        } else {
          console.error(err);
          window.alert("알 수없는 오류가 발생했습니다.");
        }
      });
  }, [dispatch]);

  return (
    <>
      <AssetHeader />
      <S.AssetPageContainer>
        <S.ContentContainer>
          <AssetProfileContainer />
          <S.Grid>
            <S.Title>입출금 계좌</S.Title>
            <SavingAccount assetdata={assetdata} />
            <S.Title>증권 계좌</S.Title>
            <Stock assetdata={assetdata} />
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
