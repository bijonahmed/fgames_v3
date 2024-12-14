import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";

import AuthUser from "../components/AuthUser";
import axios from "/config/axiosConfig";
import QRCode from 'qrcode';


const Deposit = () => {

  const [selectedCurrency, setSelectedCurrency] = useState("Bitcoin");
  const [currencyImage, setCurrencyImage] = useState("https://cryptologos.cc/logos/bitcoin-btc-logo.png");
  const [getQrcode, setQrCode] = useState("");
  const [waAddress, setAddress] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('nav-home');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [copySuccess, setCopySuccess] = useState(false); // Track copy success
  //const [qrCode, setQrCode] = useState('');
  const [currencyOptions] = useState([
    { name: 'Bitcoin', img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { name: 'Ethereum', img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { name: 'Litecoin', img: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png' },
    { name: 'Ripple', img: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
    { name: 'Dogecoin', img: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.name);
  };

  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  const handleDepositAmountChange = (event) => {
    setDepositAmount(event.target.value);
  };

  const { token } = AuthUser();
  const { user } = AuthUser();
  const getDepositWalletAddress = async () => {
    setLoader(true);
    // Retrieve the last request data from localStorage (wallet address and timestamp)
    const lastRequestData = JSON.parse(localStorage.getItem('lastRequestData')) || { timestamp: 0, walletAddress: '' };
    const currentTimestamp = Date.now();
    //console.log("Last Request Data from LocalStorage: ", lastRequestData); // Debugging
    // Check if lastRequestData exists and if the timestamp is still valid
    if (lastRequestData.walletAddress && currentTimestamp - lastRequestData.timestamp < 300000) {
      // If the last request is within 5 minutes, show the stored wallet address and QR code
      //console.log("Using last saved wallet address:", lastRequestData.walletAddress);
      setAddress(lastRequestData.walletAddress);
      QRCode.toDataURL(lastRequestData.walletAddress)
        .then(qrCodeData => {
          setQrCode(qrCodeData);  // Set the QR code base64 string to state
        })
        .catch(error => {
          console.error("Error generating QR code:", error);
        });
      setLoader(false); // Hide loader as we are using cached data
      return;
    }
    
    // If more than 5 minutes have passed or no wallet address is found, send a new request
    try {
      setLoader(true);
      const response = await axios.get("/payment/checkwalletAddress", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const walletName = response.data.data.data.name;

      // Only update if the wallet address has changed
      if (walletName !== lastRequestData.walletAddress) {
        setAddress(walletName);
        QRCode.toDataURL(walletName)
          .then(qrCodeData => {
            setQrCode(qrCodeData);  // Set the QR code base64 string to state
          })
          .catch(error => {
            console.error("Error generating QR code:", error);
          });

        // Store the new wallet address and timestamp in localStorage
        const newRequestData = {
          walletAddress: walletName,
          timestamp: currentTimestamp,
        };

        console.log("Storing new request data: ", newRequestData); // Debugging
        localStorage.setItem('lastRequestData', JSON.stringify(newRequestData));
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false); // Hide loader after request
    }
  };

  /*
  const getDepositWalletAddress = async () => {
    setLoader(true);
    try {
      const response = await axios.get("/payment/checkwalletAddress", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      ///  console.log("wallet address: " + response.data.data.data.name);
      const walletName = response.data.data.data.name;
      setAddress(walletName);
      QRCode.toDataURL(walletName)
        .then(qrCodeData => {
          setQrCode(qrCodeData);  // Set the QR code base64 string to state
        })
        .catch(error => {
          console.error("Error generating QR code:", error);
        });

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  }; */




  const handleCopy = () => {

    navigator.clipboard.writeText(waAddress)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds

      })
      .catch(err => {
        console.error("Error copying text:", err);
      });
  };

  useEffect(() => {
    getDepositWalletAddress();
    if (!user) {
      navigate('/login'); // Redirect to the login page if `user` is null or undefined
    }
  }, [user, navigate]);
  return (
    <>
      <Helmet>
        <title>Deposit</title>
      </Helmet>

      <div>
        <GuestNavbar />
        <LeftSideBarComponent />
        <div className="main_section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="title_section">
                  <button onClick={() => navigate(-1)} style={{
                    fontSize: "14px",
                    background: "rgb(70, 79, 80)",
                    padding: "5px",
                    borderRadius: "5px",
                    transition: "0.4s ease-in-out",
                    marginRight: "10px",
                    color: "var(--white-color)"
                  }}><i className="fa-solid fa-chevron-left" /></button>
                  <h1 className="page_title">Deposit</h1>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xxl-9">
                <div className="row">
                  <div className="col-md-4">
                    {/* Start MiniSidebar */}
                   ==========
                    {/* End MiniSidebar */}
                  </div>

                  <div className="col-md-8">
                    <div className="balance_container">
                      <nav className="tab_buttons w-100">
                        <div className="row">
                          <div className="col-md-6">
                            <button
                              className={`nav-link w-100 ${activeTab === 'nav-home' ? 'active' : ''}`}
                              onClick={() => handleTabChange('nav-home')}
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected={activeTab === 'nav-home'}>Crypto
                            </button>
                          </div>
                          <div className="col-md-6 text-end">
                            <button
                              className={`nav-link w-100 ${activeTab === 'nav-profile' ? 'active' : ''}`}
                              onClick={() => handleTabChange('nav-profile')}
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected={activeTab === 'nav-profile'}>
                              Fiat
                            </button>
                          </div>
                        </div>

                      </nav>
                    </div>
                    <center>
                      {loader && <div id="Moduleloader-page" className="jssorl-009-spin">
                        <img src="/images/global_loader.png" />
                        Please wait...
                      </div>}
                    </center>
                    <div className="tab-content balance_container" id="nav-tabContent">
                      <div className={`tab-pane fade ${activeTab === 'nav-home' ? 'show active' : ''}`} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="deposit_sec">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="mb-2">Deposit Currency</h6>
                              <div className="custom-dropdown">
                                <div className="selected-currency" onClick={() => document.getElementById('dropdownList1').classList.toggle('show')}>
                                  <img id="currencyImage1" src={currencyOptions.find(c => c.name === selectedCurrency).img} alt="Currency" />
                                  <input
                                    type="text"
                                    value={selectedCurrency}
                                    placeholder="Select currency..."
                                    readOnly
                                  />
                                </div>
                                <div id="dropdownList1" className="dropdown-options">
                                  {currencyOptions.map((currency) => (
                                    <div
                                      key={currency.name}
                                      className="dropdown-option"
                                      onClick={() => handleCurrencySelect(currency)}
                                    >
                                      <img src={currency.img} alt={currency.name} /> {currency.name}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <h6 className="mb-2">Select Network</h6>
                              <select className="form-control" value={selectedNetwork} onChange={handleNetworkChange}>
                                <option value="" disabled>Select Network</option>
                                <option value="TRC20">TRC20</option>
                                <option value="ERC20">ERC20</option>
                              </select>
                            </div>
                          </div>
                          <p className="badge bg-warning fs-6 p-2 w-100 mt-2">Get 180% bonus on minimum of 10.00 BCD deposit</p>

                          {/* <button onClick={getDepositWalletAddress}>Get Deposit Wallet Address</button>
                          Add:===={waAddress}==<br /> */}

                          <div className="address_box">

                            <img src={getQrcode} alt="QR Code" /> {/* Display the generated QR code */}

                            <div className="w-100">
                              <div className="form-group">
                                <label className="mb-2">Deposit address</label>
                                <input type="text" className="form-control" value={waAddress} readOnly />
                              </div>
                              <button className="more_about btn btn-default w-100" onClick={handleCopy} >
                                <i className="fa-solid fa-copy me-2"></i>Copy
                              </button>
                              {copySuccess && (
                                <center><p className="text-success mt-2">Address copied to clipboard!</p></center>
                              )}
                              <p className="badge bg-success fs-6 p-2 w-100 mt-3">Do not deposit any other currency other than Bitcoin</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`tab-pane fade ${activeTab === 'nav-profile' ? 'show active' : ''}`} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <form className="deposit_form deposit_sec">
                          <div className="form-group mb-2">
                            <label className="mb-2">Deposit Currency</label>
                            <select className="form-control" defaultValue="">
                              <option value="" disabled>Select Currency</option>
                              <option value="BDT">BDT</option>
                              <option value="USD">USD</option>
                              <option value="INR">INR</option>
                              <option value="AED">AED</option>
                              <option value="RM">RM</option>
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className="mb-2">Deposit Method</label>
                            <select className="form-control" defaultValue="">
                              <option value="" disabled>Select Method</option>
                              <option value="Paypal">Paypal</option>
                              <option value="Payneer">Payneer</option>
                              <option value="Stripe">Stripe</option>
                            </select>
                          </div>
                          <p className="badge bg-warning fs-6 p-2 w-100 my-2">Get 180% bonus on minimum of 10.00 BCD deposit</p>
                          <div className="form-group mb-2">
                            <label className="mb-2">Amount (100-25000 USDT)</label>
                            <input type="text" className="form-control" value={depositAmount} onChange={handleDepositAmountChange} />
                          </div>
                          <button className="more_about btn btn-default w-100">Deposit</button>
                        </form>
                      </div>

                      <div className={`tab-pane fade ${activeTab === 'nav-contact' ? 'show active' : ''}`} id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        <section className="game_list_container my-3">
                          <div className="game_list">
                            <div className="games_box game_page_link">
                              <a href="#" className="game_link">
                                <i className="fa-regular fa-circle-play play_btn"></i>
                                <h1><i className="fa-solid fa-user"></i>200</h1>
                                <img src="images/games/games-logo-1.png" alt="" className="img-fluid" />
                              </a>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-3 d-xxl-block d-none ">
                <div className="right_sidebar">
                  <a href="#">
                    <div className="ads_section">
                      <img src="/images/300x600.gif" className="ads_image img-fluid" />
                    </div>
                  </a>
                  <a href="#">
                    <div className="ads_section_two">
                      <img src="/images/adsbannar.webp" className="ads_image img-fluid" />
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
          <Footer />
        </div>

      </div>
    </>
  );
};

export default Deposit;
