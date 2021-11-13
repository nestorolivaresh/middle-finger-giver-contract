async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const middleFingerContractFactory = await hre.ethers.getContractFactory(
    "MiddleFingerPortal"
  );
  const middleFingerContract = await middleFingerContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await middleFingerContract.deployed();

  console.log("MiddleFingerPortal address: ", middleFingerContract.address);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

runMain();
