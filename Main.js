// ==UserScript==
// @name         Nexim Feeder Setup Report Generator
// @namespace    https://github.com/Worthington-Assembly/SetupReports/
// @version      1.0.2
// @description  Generates and formats a Nexim Feeder Setup Report
// @author       JackMBurch
// @match        file:///C:/Nexim/Client/Data/Report2021/Work1/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @updateURL    https://github.com/Worthington-Assembly/SetupReports/blob/main/Main.js
// @downloadURL  https://github.com/Worthington-Assembly/SetupReports/blob/main/Main.js
// @grant        none
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

var clickEvent = document.createEvent('MouseEvents')
clickEvent.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
var doubleClickEvent = new MouseEvent('dblclick', { 'view': window, 'bubbles': true, 'cancelable': true });
var header = document.getElementById('reportIndex_header');
header.innerHTML += '<div class="float-right"><nav><ul id="menu-2" style="margin: 20px 10px 20px 0px; padding: 0; text-align: right;"><li style="display: inline; list-style: none; padding-left: 15px; text-align: -webkit-match-parent;"><a id="print-2" style="background: none; color: #999; text-decoration: none;"><img src="https://i.ibb.co/SrfwnqR/print-lock.png" alt="Setting-2" title="印刷-2"></a></li></ul></nav></div>'
document.getElementById('print-2').addEventListener (
    "click", ButtonClickAction, false
);
document.getElementById('print').addEventListener (
    "click", MainButtonClickAction, false
);

var feederSetupButton = document.getElementById('jobreport_tile_feedersetup');

async function MainButtonClickAction (zEvent) {
    preview();
}

async function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    */
    feederSetupButton.click();
    heightSettingsFilter().then(() => {
        hideFeature('AVL').then(() => {
            hideFeature('AVLNAME').then(() => {
                hideFeature('Feeder').then(() => {
                    hideFeature('Type').then(() => {
                        hideFeature('Width').then(() => {
                            hideFeature('Pitch').then(() => {
                                hideFeature('Height').then(() => {
                                    hideFeature('Status').then(() => {
                                        hideFeature('QTY').then(() => {
                                            hideFeature('BarCode').then(() => {
                                                resizeColumn('PartNumber').then(() => {
                                                    resizeColumn('PartComment').then(() => {
                                                        resizeColumn('Shape').then(() => {
                                                            setTimeout(function() {
                                                                preview();
                                                            }, 100);
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function resizeColumn(input) {
    return new Promise((resolve) => {
        waitForElm('#jobreport_feederSetup_grid1_table_' + input).then((header) => {
            var r = getResizeHandle(header);
            setTimeout(function() {
                r.dispatchEvent(doubleClickEvent);
                resolve(true);
            }, 10);
        });
    });
}

function getResizeHandle(elem) {
    var subdivs = elem.getElementsByTagName('div');
    for (var i = 0; i < subdivs.length; i++)
    {
        var subas = subdivs[i].getElementsByTagName('a');
        for (var b = 0; b < subas.length; b++)
        {
            var spans = subas[b].getElementsByTagName('span');
            for (var c = 0; c < spans.length; c++)
            {
                if (spans[c].classList.contains('ui-iggrid-resizing-handle'))
                {
                    return spans[c];
                }
            }
        }
    }
}

function heightSettingsFilter() {
    return new Promise((resolve) => {
        waitForElm('#jobreport_feederSetup_grid1_table_featureChooser_headerButton_Height').then((settings) => {
            settings.dispatchEvent(clickEvent);
            waitForElm('#jobreport_feederSetup_grid1_table_featurechooser_dd_li_Height_AdvancedFiltering').then((advancedFilter) => {
                advancedFilter.dispatchEvent(clickEvent);
                var popup = document.getElementById('jobreport_feederSetup_grid1_table_container_dialog_content');
                var input = document.evaluate('table/tbody/tr/td[2]/div[1]/div[2]/input[1]', popup, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
                input.value = 'Does not equal';
                waitForElm('#jobreport_feederSetup_grid1_table_container_dialog_footer_buttonok').then((searchButton) => {
                    setTimeout(function() {
                        searchButton.click();
                        resolve(true);
                    }, 500);
                }).then();
            });
        });
    }
)};

function hideFeature(input) {
    return new Promise((resolve) => {
        waitForElm('#jobreport_feederSetup_grid1_table_featureChooser_headerButton_' + input).then((settings) => {
            settings.dispatchEvent(clickEvent);
            waitForElm('#jobreport_feederSetup_grid1_table_featurechooser_dd_li_' + input + '_Hiding').then((hiding) => {
                hiding.dispatchEvent(clickEvent);
                setTimeout(function() {
                    hiding.dispatchEvent(clickEvent);
                    resolve(true);
                }, 100);
            });
        });
    });
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


function preview()
{
	document.body.style.backgroundColor = "#FFF";
	$(".ui-igtilemanager-right").addClass("noprint");
	$(".ui-igsplitter-splitbar-vertical").addClass("noprint");
	HideBorder();
	SpliterHide();
	if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) )
	{
		document.all.WebBrowser.ExecWB(7,1);
	}
	else
	{
		window.print();
	}
	ShowBoder();
	document.body.style.backgroundColor = "#333";
}

var border, backgroundColor;
var _targElem0, _targElem1, _targElem2, _targElem3;
var _elem0Class, _elem1Class, _elem2Style;

function HideBorder() {
	_targElem0 = $('#splitter');
	_elem0Class = _targElem0[0].className;
	_targElem1 = $('#splitter > div');
	_elem1Class = _targElem1[0].className;
	_targElem2 = $('#splitter > div > div');
	_elem2Style = _targElem2[0].style.cssText;
	_targElem3 = $('#splitter > div > div > div');

	border = $(".ui-igtile-maximized").css("border");
	$(".ui-igtile-maximized").css("border", "none");
	$(".ui-igtile-maximized").find(".ui-igtile-inner-container").css("border", "none");
	backgroundColor = $(".ui-igtile-maximized").css("backgroundColor");
	$(".ui-igtile-maximized").css("backgroundColor", "#FFF");

	_targElem3.css('overflow', 'hidden');
	_targElem2.css('width','');
	_targElem2.css('height','');
	_targElem1[0].removeAttribute("class");
	_targElem0[0].removeAttribute("class");
}

function ShowBoder() {
	_targElem0[0].className = _elem0Class;
	_targElem1[0].className = _elem1Class;
	_targElem2[0].style.cssText = _elem2Style;
	_targElem3.css('overflow', '');

	$(".ui-igtile-maximized").css("backgroundColor", backgroundColor);
	$(".ui-igtile-maximized").css("border", border);
	$(".ui-igtile-maximized").find(".ui-igtile-inner-container").css("border", border);

	SpliterHide();
}

var spliteheight = "";
var maximizedheight;
var leftwidth;
var rightwidth;
var hidden = false;
var height;

function SpliterHide() {
	if ($(".ui-igtilemanager-right").html().length != 0) {
		if (hidden == false) {
			leftwidth = $(".ui-igtilemanager-left").css("width");
			rightwidth = $(".ui-igtilemanager-right").css("width");
			$(".ui-igtilemanager-right").css("width", "0px");
			$(".ui-igtilemanager-left").css("width", "98%");
			hidden = true;
			height = $(".ui-igtile-maximized").find(".tileHeading").css("height").split("px")
			spliteheight = $("#splitter").css("height");
			maximizedheight = $(".ui-igtile-maximized").css("height");
			if ( parseFloat(height[0]) > 790) {
//				$("#splitter").css("height", parseFloat(height[0]) + 100);
//				$(".ui-igtile-maximized").css("height", parseFloat(height[0]) + 90);
			}
		}
		else {
			$(".ui-igtilemanager-right").css("width", rightwidth);
			$(".ui-igtilemanager-left").css("width", leftwidth);
			hidden = false;
//			$("#splitter").css("height", spliteheight);
//			$(".ui-igtile-maximized").css("height", maximizedheight)
		}
	}
}
