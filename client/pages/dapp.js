import { useState } from "react";
import Link from "next/link";
import Web3Container from "../lib/Web3Container";

const Dapp = ({ accounts, contract, web3 }) => {
  const [state, setState] = useState({
    balance: undefined,
    ethBalance: undefined,
  });

  const storeValue = async () => {
    await contract.methods.set(5).send({ from: accounts[0] });
    alert("Stored 5 into account");
  };

  const getValue = async () => {
    const response = await contract.methods.get().call({ from: accounts[0] });
    setState({ balance: response });
  };

  const getEthBalance = async () => {
    const balanceInWei = await web3.eth.getBalance(accounts[0]);
    setState({ ethBalance: balanceInWei / 1e18 });
  };

  const { balance = "N/A", ethBalance = "N/A" } = state;

  return (
    <div>
      <h1>My Dapp</h1>

      <button onClick={storeValue}>Store 5 into account balance</button>
      <button onClick={getValue}>Get account balance</button>
      <button onClick={getEthBalance}>Get ether balance</button>
      <div>Account Balance: {balance}</div>
      <div>Ether Balance: {ethBalance}</div>
      <div>
        <Link href="/accounts">
          <a>My Accounts</a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
};

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Dapp Page...</div>}
    render={({ web3, accounts, contract }) => (
      <Dapp accounts={accounts} contract={contract} web3={web3} />
    )}
  />
);
