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

    window.Asc.plugin.init = function()
    {
		//event "init" for plugin
		document.getElementById("buttonAddFeild").onclick = function()
		{
			var formData = {
				type: document.getElementById('type').value,
				name: document.getElementById('name').value,
				title: document.getElementById('title').value,
				required: document.getElementById('required').checked,
				tip: document.getElementById('tip').value
			};
	
			// Convert to JSON
			var jsonData = JSON.stringify(formData);
			console.log(jsonData);
		};
		
	
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		//callback events for the method "AddContentControl"
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "AddContentControl")
		{

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
