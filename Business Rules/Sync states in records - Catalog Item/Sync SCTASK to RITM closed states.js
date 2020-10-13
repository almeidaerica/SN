/*
Advanced: checked
When to run: before
Update: checked
Table: sc_req_item
Filter Conditions: Stage | changes to | Closed Complete
*/

(function executeRule(current, previous /*null when async*/ ) {
	
    var gr = new GlideRecord('sc_task');
    gr.addQuery('request_item', current.sys_id);
    gr.query();
    var isClosedC = true;
    var isClosedI = true;
    var isClosedS = true;

    while (gr.next()) {
        var cTaskState = gr.getValue('state');

        if (cTaskState != 3 && cTaskState != 7 && isClosedC) {
            isClosedC = false;
        }

        if (cTaskState != 7 && isClosedS) {
            isClosedS = false;
        }

        if (cTaskState < 3 && isClosedI) {
            isClosedI = false;
        }
    }
    if (isClosedI) current.state = 4;
    if (isClosedC) current.state = 3;
    if (isClosedS) current.state = 7;

   //current.update();

})(current, previous);
