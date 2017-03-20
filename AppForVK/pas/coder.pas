program coder;
  var f_in, f_out: text;
      strings: array of string;
      i, a: integer;
begin
  assign(f_in,'code.in');
  assign(f_out,'code.out');
  SetLength(strings,10000000);
  reset(f_in);
    for i := 1 to 10000000 do
    begin
      readln(f_in,strings[i]);
      if strings[i].Length > 0 then
      begin
          for a := 1 to strings[i].Length do
          begin
            if copy(strings[i],a,2) = '//' then
            begin
              strings[i] := copy(strings[i],1,a-1) + '<gray><i>' + copy(strings[i],a,strings[i].Length) + '</i></gray>';
              break;
            end;
          end;
          strings[i] := '"' + strings[i] + '<br/>"';
      end else break;
    end;
  close(f_in);
  rewrite(f_out);
    writeln(f_out,'Code = "<blockquote>" +');
    for i := 1 to 10000000 do
    begin
      if strings[i].Length > 0 then
      begin
          if strings[i+1].Length > 0 then
          begin
            writeln(f_out,strings[i] + ' +');
          end else
          begin
            writeln(f_out,copy(strings[i],1,strings[i].Length-1) + '</blockquote>";');
          end;
      end else begin
        break;
      end;
    end;
  close(f_out);
end.