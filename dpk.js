const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  function setCandidateWhenEvent(event){
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = createHash(data);
    }
  }

  function setCandidateWhenNotString(){
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  }

  function createHash(string) {
   return crypto.createHash("sha3-512").update(string).digest("hex");
  }

  if (event) {
    setCandidateWhenEvent(event);
  }

  if (candidate) {
    setCandidateWhenNotString();
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  const isLongerThanPartitionKey = candidate.length > MAX_PARTITION_KEY_LENGTH;
  if (isLongerThanPartitionKey) {
    candidate = createHash(candidate);
  }

  return candidate;
};