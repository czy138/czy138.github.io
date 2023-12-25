/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function(window, undefined){

	function privateCreateInlineControl()
	{
		window.Asc.plugin.executeMethod("AddContentControl", [2, {"Lock" : 3}]);
	}

	function privateCreateScript(Tag, Label, isTextField, InternalId)
	{
		//creating script for inserting custom fields
		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oRun = oParagraph.AddText(\'" + Label + "\');\r\n\
			oRun.SetColor(255,255,255);\r\n\
			oRun.SetShd(\"clear\"," + (isTextField ? "0, 0, 255" : "255, 0, 0" ) + ");\r\n\
			oDocument.InsertContent([oParagraph], true);\r\n\
			";

		_script = _script.replaceAll("\r\n", "");
		_script = _script.replaceAll("\n", "");
		
		var _scriptObject = {
			"Props" : {
				"Tag"        : Tag,
				"Lock"       : 0,
				"InternalId" : InternalId
			},
			"Script" : _script
		};
		
		return _scriptObject;
	}
	
	function privateEncodeTextField(question)
	{
		return "q;" + question;
	}
	
	function privateEncodeDropDownField(question, items)
	{
		var _result = "d;" + question;
		
		for (var index = 0, count = items.length; index < count; ++index)
		{
			_result += ";" + items[index];
		}
		
		return _result;
	}

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	var _Control = null;

    window.Asc.plugin.init = function()
    {
		//event "init" for plugin
		document.getElementById("buttonAddTextField").onclick = function()
		{
			if (_Control)
				return;

			var _question = document.getElementById("inputTextFieldQ").value;
			var _label    = document.getElementById("inputTextFieldL").value;
			
			if (!_question || !_label)
				return;

			_Control = {
				Type     : 1,
				Question : _question,
				Label    : _label
			};

			privateCreateInlineControl();
			
			document.getElementById("inputTextFieldL").value = "";
			document.getElementById("inputTextFieldQ").value = "";
		};
		
	
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		//callback events for the method "AddContentControl"
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "AddContentControl")
		{
			if (!returnValue)
			{
				console.warn("Content control not inserted");
			}
			else if (_Control)
			{
				if (1 === _Control.Type)
				{
					var _obj = privateCreateScript(privateEncodeTextField(_Control.Question), _Control.Label, true, returnValue.InternalId);
					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				}
				else if (2 === _Control.Type)
				{
					var _obj = privateCreateScript(privateEncodeDropDownField(_Control.Question, _Control.Items), _Control.Label, false, returnValue.InternalId);
					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				}

				_Control = null;
			}
		}
	};

	window.Asc.plugin.button = function(id)
	{
		if (-1 === id)
		{
			this.executeCommand("close", "");
		}
	};

})(window, undefined);
