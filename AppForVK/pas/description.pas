program description;
  var f_in, f_out: text;
      strings: array of string;
      i, a: integer;
begin
  assign(f_in,'description.in');
  assign(f_out,'description.out');
  SetLength(strings,10000000);
  reset(f_in);
    for i := 1 to 10000000 do
    begin
      readln(f_in,strings[i]);
      if strings[i].Length > 0 then
      begin
          strings[i] := '"' + strings[i] + '<br/>"';
      end else break;
    end;
  close(f_in);
  rewrite(f_out);
    for i := 1 to 10000000 do
    begin
      if strings[i].Length > 0 then
      begin
          if strings[i+1].Length > 0 then
          begin
            writeln(f_out,strings[i] + ' +');
          end else
          begin
            writeln(f_out,copy(strings[i],1,strings[i].Length-1) + '";');
          end;
      end else begin
        break;
      end;
    end;
  close(f_out);
end.