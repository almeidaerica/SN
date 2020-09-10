/*
Advanced: checked
When to run: after
Update: checked
Table: sc_req_item
Filter Conditions: State | changes to | Closed Incomplete OR State | changes to | Closed Complete OR State | changes to | Closed Skipped
*/


(function executeRule(current, previous /*null when async*/ ) {

    var grRequest = new GlideRecord("sc_request");

    if (grRequest.get(current.request)) {
        if (current.state == '4') grRequest.request_state = "closed_incomplete";
        else if (current.state == '7') grRequest.request_state = "closed_skipped";
		else if (current.state == '3') grRequest.request_state = "closed_complete";
        grRequest.update();
    }
})(current, previous);