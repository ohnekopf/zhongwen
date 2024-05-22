const { open } = require( 'node:fs/promises');

async function count(){
  let fp;
  let count = 0;
  let entries = [];
  
  fp = await open('cedict_ts.u8', 'r');
  for await (const line of fp.readLines({"encoding": "utf8"})) {
	const thisoff=count;
	count += line.length + 2;
	if (line[0] == "#"){continue;}
	let trad,simp;
	[trad,simp] = line.split(" ");
	entries.push({"hanzi": trad , "offset": thisoff});
	entries.push({"hanzi": simp , "offset": thisoff});
  }
  entries.sort(function (l,r)
	{
		const lh = l.hanzi;
		const rh = r.hanzi;
		if (lh > rh) return 1;
		if (lh < rh) return -1;
		else return 0;
    } );

	let out = [];
	let curr = entries[0].hanzi;
	let off = [];
	for ( let entry of entries){
		if (entry.hanzi == curr){
			;//pass
		}
		else{
			//push out last elment

			off = [...new Set(off)]; // removes duplicates

			out.push({"hanzi":curr,"offsets":off});
			// reset
			curr = entry.hanzi;
			off=[];
		}
		off.push(entry.offset);
	}
	//edge case
	{
		out.push({"hanzi":curr,"offsets":off});
	}


	for ( let entry of out){
		let print = `${entry.hanzi},${entry.offsets.join()}`;
		console.log(print);
	}
  	
}

count()
