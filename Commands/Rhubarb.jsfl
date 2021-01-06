var doc = fl.getDocumentDOM();
var timeline = doc.getTimeline();
var lib = doc.library;
var result = doc.xmlPanel(fl.configURI + "XULControls/rhubarb.xml");

var thresh = 1;
var framerate = 30;

function run() {

	if(result.dismiss != "accept") return;

	if(result.rhubarbData == "") {
		alert("No rhubarb data");
		return;
	}

	doc.selectNone;

	var data = result.rhubarbData;
	var lines = data.split("\n");
	var fnames = "ABCDEFGHX";

	var idx = 0;
	var frame = 0;
	var end = lines.length;

	while(idx < end) {
		var time = lines[idx].split("\t")[0];
		var mframe = lines[idx].split("\t")[1];
		mframe = mframe.substr(0, mframe.length-1);
		var mframe1 = fnames.indexOf(mframe);

		if (
			(frame <= (time*framerate+thresh)) &&
			(frame >= (time*framerate-thresh))
			) {

			timeline.setSelectedFrames(frame,frame, true);
			timeline.insertKeyframe();
			timeline.layers[0].frames[frame].elements[0].firstFrame = mframe1;

			idx += 1;
		}

		timeline.insertFrames(1);
		frame += 1;
	}
}

run();