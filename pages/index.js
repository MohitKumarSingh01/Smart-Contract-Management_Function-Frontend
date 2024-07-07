import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [action, setAction] = useState(undefined);
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceBN = await atm.getBalance();
      const balanceInEth = ethers.utils.formatEther(balanceBN);
      const formattedBalance = parseFloat(balanceInEth).toFixed(4);
      setBalance(formattedBalance);
    }
  };

  const deposit = async () => {
    if (atm && amount > 0) {
      const tx = await atm.deposit(ethers.utils.parseEther(amount.toString()));
      await tx.wait();
      getBalance();
    }
  };

  const depositOneEth = async () => {
    if (atm) {
      const tx = await atm.deposit(ethers.utils.parseEther("1.0"));
      await tx.wait();
      getBalance();
    }
  };

  const depositTwoEth = async () => {
    if (atm) {
      const tx = await atm.deposit(ethers.utils.parseEther("2.0"));
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm && amount > 0) {
      const tx = await atm.withdraw(ethers.utils.parseEther(amount.toString()));
      await tx.wait();
      getBalance();
    }
  };

  const withdrawOneEth = async () => {
    if (atm) {
      const tx = await atm.withdraw(ethers.utils.parseEther("1.0"));
      await tx.wait();
      getBalance();
    }
  };

  const withdrawTwoEth = async () => {
    if (atm) {
      const tx = await atm.withdraw(ethers.utils.parseEther("2.0"));
      await tx.wait();
      getBalance();
    }
  };

  const verifyHuman = () => {
    const inputNum = parseInt(verificationInput);
    if (!isNaN(inputNum) && inputNum >= 10 && inputNum <= 99) {
      setVerificationError('');
      setIsVerified(true);
    } else {
      setVerificationError('Verification failed. Please enter a number between 10 and 99.');
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Install Metamask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <div className="account-connection">
          <button onClick={connectAccount}>Connect your Metamask wallet</button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p><strong>Your Account Address: </strong>{account}</p>
        <p><strong>Your Account Balance: </strong>{balance} ETH</p>
        {!isVerified ? (
          <div className="verification-container">
            <label htmlFor="verificationInput"><strong>Verify you are not a robot: </strong></label>
            <input
              type="number"
              id="verificationInput"
              value={verificationInput}
              onChange={(e) => setVerificationInput(e.target.value)}
              placeholder="Enter any two digit's number"
              min="10"
              max="99"
              step="1"
              className="verification-input"
            />
            <button className="btn" onClick={verifyHuman}>Verify</button>
            {verificationError && <p style={{ color: 'red' }}>{verificationError}</p>}
          </div>
        ) : action === undefined ? (
          <div className="action-selection">
            <p><strong>Choose among given services :</strong></p>
            <button className="btn" onClick={() => setAction("deposit")}>Deposit</button>
            <button className="btn" onClick={() => setAction("withdraw")}>Withdraw</button>
          </div>
        ) : action === "deposit" ? (
          <div>
            <button className="btn" onClick={depositOneEth}>Deposit 1 ETH</button>
            <button className="btn" onClick={depositTwoEth}>Deposit 2 ETH</button>
            <br /><br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Enter amount in ETH"
            />
            <button className="btn" onClick={deposit}>Deposit</button>
            <br></br><br /><button className="btn" onClick={() => setAction(undefined)}>Back</button>
          </div>
        ) : (
          <div>
            <button className="btn" onClick={withdrawOneEth}>Withdraw 1 ETH</button>
            <button className="btn" onClick={withdrawTwoEth}>Withdraw 2 ETH</button>
            <br /><br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Enter amount in ETH"
            />
            <button className="btn" onClick={withdraw}>Withdraw</button>
            <br/><br/><button className="btn" onClick={() => setAction(undefined)}>Back</button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <h1>Mohit's Crypto Exchange Hub</h1>
      </header>
      <div className="content">
        {initUser()}
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #B5F3A3;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .header {
          border: 4px double #fff;
          padding: 20px;
          margin-bottom: 20px;
          font-family: 'Bodoni MT', sans-serif;
        }
        .content {
          border: 4px double #000;
          padding: 20px;
        }
        .account-connection {
          border: 2px solid #000;
          padding: 20px;
          margin-bottom: 20px;
        }
        .action-selection {
          border: 2px solid #000;
          padding: 20px;
          margin-bottom: 20px;
        }
          .verification-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
        .verification-input {
  width: 100%;
}
        .btn {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: underline;
          display: inline-block;
          font-size: 16px;
          margin: 100px;
          gap: 10px;
          transition-duration: 0.4s;
          cursor: pointer;
        }
        .btn:hover {
          background-color: white;
          color: black;
          border: 2px solid #4CAF50;
        }
      `}
      </style>
    </main>
  );
                }
