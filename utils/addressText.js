const transformAddressToText = address => address?.replace(", ", "\n") || "-";

export default transformAddressToText;
