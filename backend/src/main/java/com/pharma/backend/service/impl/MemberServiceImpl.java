package com.pharma.backend.service.impl;

import com.pharma.backend.model.Member;
import com.pharma.backend.repository.MemberRepository;
import com.pharma.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Member registerMember(Member member) {
        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        member.setPassword(passwordEncoder.encode(member.getPassword()));
        return memberRepository.save(member);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public long getMemberCount() {
        return memberRepository.count();
    }

    @Override
    public Member addMember(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        return memberRepository.save(member);
    }

    @Override
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
    
      @Override
    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

    @Override
    public Member updateStatus(Long id, String status) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            throw new RuntimeException("Member not found with id: " + id);
        }

        Member member = optionalMember.get();

        if ("approve".equalsIgnoreCase(status)) {
            member.setApproved(true);
        } else if ("disable".equalsIgnoreCase(status)) {
            member.setDisabled(true);
        } else if ("enable".equalsIgnoreCase(status)) {
            member.setDisabled(false);
        } else {
            throw new RuntimeException("Invalid status: " + status);
        }

        return memberRepository.save(member);
    }
  

}
