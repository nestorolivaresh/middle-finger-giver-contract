async function main() {
  const [owner] = await hre.ethers.getSigners();
  const middleFingerContractFactory = await hre.ethers.getContractFactory(
    "MiddleFingerGiver"
  );
  const middleFingerContract = await middleFingerContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await middleFingerContract.deployed();
  console.log("Contract deployed to:", middleFingerContract.address);
  console.log("Contract deployed by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    middleFingerContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let middleFingerTxn = await middleFingerContract.giveMiddleFinger(
    "A message! 1"
  );
  await middleFingerTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    middleFingerContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allMiddleFingers = await middleFingerContract.getAllMiddleFingers();
  let totalMiddleFingers = await middleFingerContract.getTotalMiddleFingers();
  console.log({ totalMiddleFingers, allMiddleFingers });
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
