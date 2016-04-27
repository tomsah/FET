// reading external json files with list of url

// var request = require("request");
// var url = "http://llrstaging:d7upgrade@sprint_bloodwise.llrtest.org.uk/dalek-testing/url-feed.json";

//     module.exports = {
//           'urlRead': function (test) {
// 					request({
// 					    url: url,
// 					    json: true
// 					},
// 			function (error, response, body) {
// 			    if (!error && response.statusCode === 200) {
// 			        var resolutions = [{width: 1280, height: 1024}, {width: 1024, height: 768}, {width: 400, height: 600}];
// 			        var pages= body.test;
// 			        console.log('hey',pages) // Print the json response
// 		                 resolutions.forEach(function (res) {
// 		                 	 pages.forEach(function (page) {
// 		                 	 console.log('page', page);
// 		                 	//console.log('res', res);
// 		                 	//include(dalek.js)
// 		                 	 test.open(page)
// 		                    	.resize(res)
// 								.screenshot('pics/' + res.width + '_' + res.height + '_' + page.replace('http://', '') + '.png')
// 							//test.wait(1000);
							
// 		                 });
// 		             });
// 		        test.done();
// 			    }
// 			}) 
//          }
//     }

// adding custom argument to dalek => url
var argv = require('minimist')(process.argv.slice(3));
// multiple screenshot 
module.exports = {
		'A lot of screenshots': function (test) {
		var url = argv['a'];

         var resolutions = [{width: 1280, height: 1024}, {width: 780 , height: 1024}, {width: 400, height: 600}];
         // pickup parameter from CLI
         // pass it to pages array
         var pages = [url];
     	 //var pages = this.newThing;
         resolutions.forEach(function (res) {
             pages.forEach(function (page) {
                 test.open(page)
                     .resize(res)
                     //.wait(1000)
                     .screenshot('client/assets/pics/' + res.width + '_' + res.height + '_' + page.replace('https://', '') + '.png')
             });
         });
     
         test.done();
     }
}



