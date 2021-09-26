import { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import getContract from "./getContract";
import contractDefinition from "./contracts/SimpleStorage.json";

export default ({ render, renderLoading }) => {
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });

  useEffect(() => {
    const setup = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContract(web3, contractDefinition);
        setState({ web3, accounts, contract });
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.log(error);
      }
    };
    setup();
  }, [render, renderLoading]);

  return state.web3 && state.accounts ? render(state) : renderLoading();
};
