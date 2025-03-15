const LIST = [
	require("./NotImplementedType").default,
	require("./NoneType").default,
	require("./int").default,
	require("./jsint").default,
	require("./float").default,
	require("./bool").default,
	require("./str").default,
	require("./type[int]").default,
	require("./type[float]").default,
	require("./type[str]").default,
]

import ILIST from './index';
ILIST.push(...LIST);
export default ILIST;
